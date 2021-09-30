const { createClient } = require('@supabase/supabase-js')
const axios = require('axios')
const express = require('express')
const hash = require('object-hash')
const puppeteer = require('puppeteer')
const cloudinary = require('cloudinary').v2

const app = express()

app.use(express.json())

const supabase = createClient(process.env.SUPABASE_PUBLIC_URL, process.env.SUPABASE_SERVICE_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time)
    })
}


// It is important that the full path is specified here
app.post('/api/subscribe', async (req, res) => {

    const { email: emailAddress } = req.body
    const baseApiUrl = 'https://api.convertkit.com/v3';
    const formId = '2634622';

    const params = {
        api_key: process.env.CONVERTKIT_API_KEY,
        api_secret: process.env.CONVERTKIT_API_SECRET,
        email: emailAddress
    };

    let disposableEmail = false;

    await axios.get(`https://open.kickbox.com/v1/disposable/${emailAddress}`).then((result) => {
        disposableEmail = result.data.disposable;

        if (result.data.disposable) {
            res.status(result.status).send({
                message: {
                    type: 'error',
                    message: 'That does not seem like a valid email'
                }
            }).end()
        }
    }).catch((err) => {
        res.status(err.status).send(err.detail).end()
    });

    if (!disposableEmail) {
        await axios.post(`${baseApiUrl}/forms/${formId}/subscribe`, params).then((result) => {
            res.status(result.status).send({
                email: result.data.subscription.subscriber.email_address,
                message: {
                    type: 'success',
                    message: `Please check your inbox ${result.data.subscription.subscriber.email_address}`
                }
            }).end()

        }).catch((err) => {
            res.status(err.status).send({
                message: {
                    type: 'error',
                    message: 'Oops. Something went wrong!'
                }
            }).end()
        });
    }

})

app.post('/api/increment_page_view', async (req, res) => {
    const { slug: pageSlug } = req.body

    await supabase.rpc('increment_page_view', { pageSlug }).then((result) => {
        if (result.error) {
            res.status(result.status).send(result.error).end()
        }
    });
})

/**
 * Auto-generates an opengraph image.
 */
app.post('/api/open_graph', async (req, res) => {
    const params = {
        slug: req.body.slug,
        verified: req.body.verified,
        title: req.body.title,
        authorImage: req.body.authorImage,
        authorName: req.body.authorName,
        authorNameBadge: req.body.authorNameBadge,
        authorNameDesc: req.body.authorNameDesc
    }

    // Get a unique id for our image based of its params
    const CLOUDINARY_FOLDER = 'hawtoo/opengraph'
    const imageId = hash(params)

    // First check to see if its already uploaded to cloudinary
    try {
        const result = await cloudinary.api.resource(`${CLOUDINARY_FOLDER}/${imageId}`)
        console.log('Got existing image')

        res.setHeader('Content-Type', 'text/x-uri');
        // res.status('200').send(result.secure_url).end()
        res.redirect(301, result.secure_url)

        return
    } catch (e) {
        // No existing image
        console.log('No existing image')
    }

    // Spawn a new headless browser
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({
        width: 1600,
        height: 800
    })

    // Visit our preview page and generate the image
    const url = new URL(`${process.env.BASE_URL}/open-graph/`)
    Object.keys(params)
        .forEach((key) => {
            if (params[key]) {
                url.searchParams.set(key, params[key])
            }
        })

    // console.log(url.toString())

    await page.goto(url.toString(), { waitUntil: 'domcontentloaded' })
    await delay(1000)
    const imageBuffer = await page.screenshot()
    await browser.close()

    // Upload to cloudinary
    const image = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBuffer.toString('base64')}`,
        {
            public_id: imageId,
            folder: CLOUDINARY_FOLDER
        }
    )

    // res.status('200').send(image.secure_url).end()
    res.setHeader('Content-Type', 'text/x-uri');
    // response.message(image.secure_url)
    res.redirect(301, image.secure_url);
});

module.exports = app
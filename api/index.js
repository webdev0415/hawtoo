import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";
import hash from 'object-hash'
import { v2 as cloudinary } from 'cloudinary';
const { createClient } = require('@supabase/supabase-js')
const axios = require('axios')
const express = require('express')

// Express
const app = express()

app.use(express.json())

const supabase = createClient(process.env.SUPABASE_PUBLIC_URL, process.env.SUPABASE_SERVICE_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// It is important that the full path is specified here
app.post('/subscribe', async (req, res) => {

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

app.post('/increment_page_view', async (req, res) => {
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
app.get('/og', async (req, res) => {

    // eslint-disable-next-line no-unused-vars
    function delay(time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), time)
        })
    }

    // Extract the url from the query parameter `path`
    const params = {
        slug: req.query.slug,
        verified: req.query.verified,
        title: req.query.title,
        authorImage: req.query.authorImage,
        authorName: req.query.authorName,
        authorNameBadge: req.query.authorNameBadge,
        authorNameDesc: req.query.authorNameDesc
    }

    // Get a unique id for our image based of its params
    const CLOUDINARY_FOLDER = 'hawtoo/opengraph'
    const imageId = hash(params)

    // First check to see if its already uploaded to cloudinary
    try {
        const result = await cloudinary.api.resource(`${CLOUDINARY_FOLDER}/${imageId}`)
        // Got existing image

        consola.success('Got existing image!')

        res.setHeader(
            "Cache-Control",
            "s-maxage=31536000, max-age=31536000, stale-while-revalidate"
        )
        res.setHeader("Content-Type", "image/png")
        // res.end(result.secure_url)
        res.redirect(301, result.secure_url)

        return;
    } catch (e) {
        // No existing image

    }

    // Start Playwright with the dynamic chrome-aws-lambda args
    const browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath:
            process.env.NODE_ENV !== "development"
                ? await chromium.executablePath
                : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: process.env.NODE_ENV !== "development" ? chromium.headless : true,
    })

    // Create a page with the recommended Open Graph image size
    const page = await browser.newPage({
        viewport: {
            width: 1600,
            height: 800
        },
    })

    // Visit our preview page and generate the image
    const url = new URL(`${process.env.BASE_URL}/open-graph/`)
    Object.keys(params)
        .forEach((key) => {
            if (params[key]) {
                url.searchParams.set(key, params[key])
            }
        })

    await page.goto(url.toString(), { waitUntil: 'domcontentloaded' })
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

    res.redirect(301, image.secure_url);
});

module.exports = app;

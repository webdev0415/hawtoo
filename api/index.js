import consola from "consola";
import hash from 'object-hash'
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@supabase/supabase-js'
import { post, get } from 'axios';
import express from 'express';

// Express
const app = express()

app.use(express.json());

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

    await get(`https://open.kickbox.com/v1/disposable/${emailAddress}`).then((result) => {
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
        await post(`${baseApiUrl}/forms/${formId}/subscribe`, params).then((result) => {
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
        console.log(e);
    }

    // Visit our preview page and generate the image
    const url = new URL(`${'https://hawtoo.com'}/open-graph/`)
    Object.keys(params)
        .forEach((key) => {
            if (params[key]) {
                url.searchParams.set(key, params[key])
            }
        })

    let imageBuffer;
    const screenshotApiKey = process.env.SCREENSHOT_API_KEY;

    // encodeURIComponent is important here because the url passed contains query strings too.
    await get(`https://screenshots-multiplehats.vercel.app/api?key=${screenshotApiKey}&delay=1500&url=${encodeURIComponent(url.toString())}`).then((result) => {
        imageBuffer = result.data;
    }).catch((err) => {
        res.status(400).json({
            "success": false,
            "error": "Error getting screenshot!",
            "dev": err,
        }).end();
    });

    // Upload to cloudinary
    const image = await cloudinary.uploader.upload(imageBuffer, { public_id: imageId, folder: CLOUDINARY_FOLDER })

    res.redirect(301, image.secure_url);
});

module.exports = app;

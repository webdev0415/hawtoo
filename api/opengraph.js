const express = require('express')
const hash = require('object-hash')
const puppeteer = require('puppeteer')
const cloudinary = require('cloudinary').v2

const app = express()
app.use(express.json())

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

    // response.message(image.secure_url)
    res.redirect(301, image.secure_url);
});

module.exports = app

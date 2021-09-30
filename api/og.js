import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";
import hash from 'object-hash'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async (req, res) => {
    // Extract the url from the query parameter `path`
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
        // Got existing image

        res.setHeader(
            "Cache-Control",
            "s-maxage=31536000, max-age=31536000, stale-while-revalidate"
        )
        res.setHeader("Content-Type", "image/jpeg")
        res.end(result.secure_url)
    } catch (e) {
        // No existing image
        throw new Error(e);
    }

    // Start Playwright with the dynamic chrome-aws-lambda args
    const browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath:
            process.env.NODE_ENV !== "development"
                ? await chromium.executablePath
                : "/usr/bin/chromium",
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
    await page.waitForTimeout(1000)
    const imageBuffer = await page.screenshot({
        type: "jpeg",
    })
    await browser.close()

    // Upload to cloudinary
    const image = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBuffer.toString('base64')}`,
        {
            public_id: imageId,
            folder: CLOUDINARY_FOLDER
        }
    )

    // Set the s-maxage property to cache at the CDN layer, and max-age for the client browser cache
    res.setHeader(
        "Cache-Control",
        "s-maxage=31536000, max-age=31536000, stale-while-revalidate"
    )
    res.setHeader("Content-Type", "image/jpeg")
    res.end(image.secure_url)
}
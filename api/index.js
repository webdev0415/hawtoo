import express from 'express'
import consola from 'consola'
import { post, get } from 'axios'
import hash from 'object-hash'

import { createClient } from '@supabase/supabase-js'
import { Webhook } from 'discord-webhook-node'
import { v2 as cloudinary } from 'cloudinary'

import { emailMask } from './lib/helpers'
import { getOpenSeaBasicInfo } from './lib/opensea'
import { addProjectRequest, getAdSpot } from './lib/notion'
import { updateTotalReferrals, updateReferralRewards } from './lib/supabase'

// Express
const app = express()

app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_PUBLIC_URL,
  process.env.SUPABASE_SERVICE_KEY
)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// It is important that the full path is specified here
app.post('/subscribe', async (req, res) => {
  const { email: emailAddress } = req.body
  const baseApiUrl = 'https://api.convertkit.com/v3'
  const formId = '2647747'
  const params = {
    api_key: process.env.CONVERTKIT_API_KEY,
    api_secret: process.env.CONVERTKIT_API_SECRET,
    email: emailAddress,
  }

  let disposableEmail = false

  consola.info(`Received ${emailAddress}`)

  await get(`https://open.kickbox.com/v1/disposable/${emailAddress}`)
    .then((result) => {
      disposableEmail = result.data.disposable

      if (result.data.disposable) {
        consola.info(`${emailAddress} is a disposable email. Stop subscribing`)
        res
          .status(result.status)
          .send({
            message: {
              type: 'error',
              message: 'That does not seem like a valid email',
            },
          })
          .end()
      }
    })
    .catch((err) => {
      // consola.error(err);
      res.status(err.status).send(err.detail).end()
    })

  if (!disposableEmail) {
    consola.info(`${emailAddress} looks legit. Subscribing to ConvertKit.`)
    await post(`${baseApiUrl}/forms/${formId}/subscribe`, params)
      .then((result) => {
        consola.success(`${emailAddress} got subscribed`)

        res
          .status(result.status)
          .send({
            email: result.data.subscription.subscriber.email_address,
            message: {
              type: 'success',
              message: `Please check your inbox ${result.data.subscription.subscriber.email_address}`,
            },
          })
          .end()
      })
      .catch((err) => {
        // consola.error(err);
        res
          .status(500)
          .send({
            message: {
              type: 'error',
              message: 'Oops. Something went wrong!',
            },
          })
          .end()
      })
  }
})

app.post('/increment_page_view', async (req, res) => {
  const { slug: pageSlug } = req.body
  const { data, error } = await supabase.rpc('increment_page_view', {
    page_slug: pageSlug,
  })

  if (error) {
    throw new Error(error.message)
  } else {
    res.status(200).send(data)
  }
})

app.post('/increment_watchlist_view', async (req, res) => {
  const { watchlists } = req.body
  const { data, error } = await supabase.rpc('increment_watchlist_view', {
    watchlist_id: watchlists,
  })
  if (!error) {
    res.status(200).send({
      message: 'Success',
    })
  }
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
    authorNameDesc: req.query.authorNameDesc,
  }

  // Get a unique id for our image based of its params
  const CLOUDINARY_FOLDER = 'hawtoo/opengraph'
  const imageId = hash(params)

  // First check to see if its already uploaded to cloudinary
  try {
    const result = await cloudinary.api.resource(
      `${CLOUDINARY_FOLDER}/${imageId}`
    )
    // Got existing image

    consola.success('Got existing image!')

    res.setHeader(
      'Cache-Control',
      's-maxage=31536000, max-age=31536000, stale-while-revalidate'
    )
    res.setHeader('Content-Type', 'image/png')
    // res.end(result.secure_url)
    res.redirect(301, result.secure_url)

    return
  } catch (e) {
    console.log(e)
  }

  // Visit our preview page and generate the image
  const url = new URL(`${'https://hawtoo.com'}/open-graph/`)
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.set(key, params[key])
    }
  })

  let imageBuffer
  const screenshotApiKey = process.env.SCREENSHOT_API_KEY

  // encodeURIComponent is important here because the url passed contains query strings too.
  await get(
    `https://screenshots-multiplehats.vercel.app/api?key=${screenshotApiKey}&delay=1500&url=${encodeURIComponent(
      url.toString()
    )}`
  )
    .then((result) => {
      imageBuffer = result.data
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          success: false,
          error: 'Error getting screenshot!',
          dev: err,
        })
        .end()
    })

  // Upload to cloudinary
  const image = await cloudinary.uploader.upload(imageBuffer, {
    public_id: imageId,
    folder: CLOUDINARY_FOLDER,
  })

  res.redirect(301, image.secure_url)
})

/**
 * Get OpenSea data.
 */
app.get('/opensea', async (req, res) => {
  const { slug } = req.query

  await getOpenSeaBasicInfo(slug)
    .then((response) => {
      res.status(200).json({ response }).end()
    })
    .catch((error) => {
      res.status(404).send(error)
      throw new Error(error.message)
    })
})

app.post('/request-project', async (req, res) => {
  const { email, userId, url, searchQuery } = req.body

  await addProjectRequest(url, email, userId, searchQuery)
    .then((response) => {
      res.status(200).json({ response }).end()
    })
    .catch((error) => {
      throw new Error(error)
    })
})

app.get('/spot', async (req, res) => {
    const { id: adSpotId } = req.query
    await getAdSpot(adSpotId).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-max-age=3600, stale-while-revalidate');
        res.status(200).json({ response }).end()
    }).catch((error) => {
        throw new Error(error)
    })
})

/**
 * Receives the Sparkloop webhooks.
 *
 * Send back a blank response with a status code of 200
 * for Sparkloop to see this webhook as successful.
 *
 * new_referral -> type, campaign_id, subscriber, referrer,
 * reward_unlocked -> type, campaign_id, subscriber, reward
 *
 * @see https://support.sparkloop.app/product/features/webhooks
 */
app.post('/sparkloop', async (req, res) => {
  const { type, subscriber, referrer, reward } = req.body
  const discord = new Webhook(
    'https://discord.com/api/webhooks/897902446817460296/zcQDl0TIUPwUMgKvg0DQx9N_tLt0sxAHe8tTzYgAsjJuQrlCJ-KillYz-LjEfN_QERMY'
  )
  let referralCount, supabaseEmail
  let found = false
  if (type === 'new_referral') {
    // referrer.email = 'chris@chrisjayden.com';
    consola.info(`New referral from ${referrer.email}`)

    await updateTotalReferrals(referrer.email, referrer.tot_referrals)
      .then((res) => {
        if (res?.data && res.data[0]) {
          found = true
          referralCount = res.data[0].referrals
          supabaseEmail = res.data[0].email
          consola.info(
            `Updated referral count to ${referralCount} for ${supabaseEmail}`
          )
        } else {
          consola.info(
            `No matching database entry to update referral count for ${subscriber.email}`
          )
        }
      })
      .catch((err) => consola.error(err))

    if (found) {
      await discord
        .info(
          '🚀 New referral',
          `${emailMask(referrer.email)} referred ${emailMask(
            subscriber.email
          )}`,
          `Updated referral count to ${referralCount}`
        )
        .then(() =>
          consola.success(`Sent "new referral" Discord webhook successfully!`)
        )
        .catch((err) => consola.error(err))
    }

    consola.log('----------------')
  } else if (type === 'reward_unlocked') {
    // subscriber.email = 'chris@chrisjayden.com';
    consola.info(`${subscriber.email} unlocked a reward`)

    await updateReferralRewards(subscriber.email, reward)
      .then((res) => {
        if (res?.data && res.data[0]) {
          found = true
          supabaseEmail = res.data[0].email
          consola.info(`Updated rewards for ${supabaseEmail}`)
        } else {
          consola.info(
            `No matching database entry to update reward for ${subscriber.email}`
          )
        }
      })
      .catch((err) => consola.error(err))

    if (found) {
      await discord
        .success(
          '🔥 Reward unlocked',
          `Unlocked: ${reward.name}`,
          `By: ${emailMask(subscriber.email)}`
        )
        .then(() =>
          consola.success(`Sent "reward unlock" Discord webhook successfully!`)
        )
        .catch((err) => consola.error(err))
    }

    consola.log('----------------')
  }

  res.status(200).end()
})

module.exports = app

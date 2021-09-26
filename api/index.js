import { createClient } from '@supabase/supabase-js'
const axios = require('axios')
const express = require('express')
const supabase = createClient(process.env.SUPABASE_PUBLIC_URL, process.env.SUPABASE_SERVICE_KEY);
const app = express()

app.use(express.json())

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
        console.log(result);
        if (result.error) {
            res.status(result.status).send(result.error).end()
        }
    });
})

module.exports = app
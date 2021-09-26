
// import express from 'express'
// import consola from "consola";
// import axios from 'axios';
const axios = require('axios')
const apiKey = process.env.CONVERTKIT_API_KEY;
const apiSecret = process.env.CONVERTKIT_API_SECRET;
const baseApiUrl = 'https://api.convertkit.com/v3';
const formId = '2634622';
const express = require('express')

const app = express()

app.use(express.json())

app.post('/api/subscribe', async (req, res) => {

    const { email: emailAddress } = req.body

    const params = {
        api_key: apiKey,
        api_secret: apiSecret,
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
        res.status(err.status).send(err.detail)
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
            res.status('500').send({
                message: {
                    type: 'error',
                    message: 'Oops. Something went wrong!'
                }
            }).end()
        });
    }

})

module.exports = app
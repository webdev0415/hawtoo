import express from 'express'
import consola from "consola";
import axios from 'axios';

const apiKey = 'yRGlZY5m5XORissTgeZd-g';
const apiSecret = 'g59PykVS5Jk2QQSynebmIFx3KJtmfYX7YoQbabGGhNo';
const baseApiUrl = 'https://api.convertkit.com/v3';
const formId = '2634622';
// const convertkit = new Convertkit({ apiKey, apiSecret, baseApiUrl })

const app = express()
app.use(express.json())

app.post('/subscribe', async (req, res) => {

    const { email: emailAddress } = req.body

    const params = {
        api_key: apiKey,
        api_secret: apiSecret,
        email: emailAddress
    };

    let disposableEmail = false;

    consola.info(`Email is ${emailAddress}`);

    await axios.get(`https://open.kickbox.com/v1/disposable/${emailAddress}`).then((result) => {
        disposableEmail = result.data.disposable;

        consola.info(`Is it a disposable email?: ${disposableEmail}`);

        if (result.data.disposable) {
            res.status(result.status).send({
                message: {
                    type: 'error',
                    message: 'That does not seem like a valid email'
                }
            })
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
            })

        }).catch((err) => {
            consola.error(err)
            res.status('500').send({
                message: {
                    type: 'error',
                    message: 'Oops. Something went wrong!'
                }
            })
        });
    }

})

export default {
    path: '/api',
    handler: app
}
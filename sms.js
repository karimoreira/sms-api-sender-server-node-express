const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')
require('dotenv').config()

const app = express()
const port = 3000

app.use(bodyParser.json())

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

app.post('/send-sms', (req, res) => {
    const { body, to } = req.body;
    client.messages
        .create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        })
        .then(message => res.json({ sid: message.sid }))
        .catch(error => res.status(500).json({ error: error.message }))
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const express = require('express');

const app = express();



const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.RE;



// const CLIENT_ID = '798452348195-iitesposa85dlcoarn9rifr35t0gcuds.apps.googleusercontent.com'
// const CLIENT_SECRET = 'NJLIqJThenn0D7rj05_jDOzj'
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
// const REFRESH_TOKEN = '1//04GKDhH3iMcV7CgYIARAAGAQSNwF-L9IrJbkg5i6xTUWKg3LwclEu6qJ-YafvxKCNxP_YUuUL7oUk0OQaSDhs5T9JF8ThBSA2czc'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

// // app.post(
app.get("/sendMail", (req, res) => {
    async function sendMail() {
        try {
            // const accessToken = await oAuth2Client.getAccessToken()
            const accessToken = 'ya29.a0ARrdaM9Uf-cFrYKOHHaPjk7KMNAwMCyOncdVGz0dwL7afPleSkXGPmtoKPdZ5qOAlfRPmItbpvYMDvQw9u20L97rsHmjAadNeStDLqrB9QR_spnka1cixoff9KIqu0zwIEAX6xBCtyvws6nDaIjsVlQJHSsb'
    
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                type: 'OAuth2',
                user: 'contactusformnxtgen@gmail.com',
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
                }
            })
    
            const mailOptions = {
                from: 'HEREISYOURAPI  <contactusformnxtgen@gmail.com>',
                to: 'ankitjangid60@gmail.com',
                subject: 'This an mail from the get request',
                text: "Hello  from me",
                html: '<h1>Hello from my API</h1>',
            };
    
            const result = await transport.sendMail(mailOptions);
            return result
        } catch (error) {
            return error
        }
    }
    
    sendMail().then((result) => console.log("Email send", result))
    .catch((error) => console.log(error.message));
});
 
// async function sendMail() {
//     try {
//         // const accessToken = await oAuth2Client.getAccessToken()
//         const accessToken = 'ya29.a0ARrdaM-BkRDEBmUhNxkCjnUbh92cntg6RQOT_AGe5qqHFyrqNDxZDWK2mDVr5S0qHs2rIhE3kba5GOEQsZc0rNebOKVKubRkoFUAbnAL5xjYoj6d2zGHZSOjd4Dzl23lrdq16Y1oNqQTWOpKS64WU7hDKt1W'

//         const transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//             type: 'OAuth2',
//             user: 'vikas.choyal1970@gmail.com',
//             clientSecret: CLIENT_SECRET,
//             refreshToken: REFRESH_TOKEN,
//             accessToken: accessToken
//             }
//         })

//         const mailOptions = {
//             from: 'HEREISYOURAPI  <vikas.choyal1970@gmail.com>',
//             to: 'ankitjangid60@gmail.com',
//             subject: 'Hello from Ankit',
//             text: "Hello  from me",
//             html: '<h1>Hello from my API</h1>',
//         };

//         const result = await transport.sendMail(mailOptions);
//         return result
//     } catch (error) {
//         return error
//     }
// }

// sendMail().then((result) => console.log("Email send", result))
// .catch((error) => console.log(error.message));
app.listen(3000, () => {
    console.log("server is up and running on port 3000.")
})
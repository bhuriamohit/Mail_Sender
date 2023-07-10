const express = require('express')
const app = express();
const accountSid = 'AC7a6ad271ff2649bdf2a30896a3c2d0cf';
const authToken = '118c386f55cf96c9fa75fee0eca25517';
const client = require('twilio')(accountSid, authToken);
app.use(express.json())
const cors = require('cors')
app.use(cors());
const http = require('http');
const { hostname } = require('os');
const nodemailer = require('nodemailer');
app.post('/portfolio/contactus',async (req,resp)=>
{
    console.log(req.body);
    let email= req.body.email;
    let topic =req.body.topic;
    let s;
    if(topic=="About Internships" || topic=="About My work")
    {
        s="Thanks for visiting my website you can contact me on following\nPersonal email : kartik150704@gmail.com\nMob No : 9817006334"
    }
    else
    {
        s="Thanks for visiting my website , I will contact you as soon as possible"
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com', // Brevo SMTP server host
        port: 587, // Brevo SMTP server port
        secure: false, // Set to true if using SSL/TLS
        auth: {
            user: 'kartikyadavwork01@gmail.com', // Your Brevo SMTP username/email
            pass: 'dMtcR4OAC0JsZIqm' // Your Brevo SMTP password
        }
    });

    // Email configurations
    const mailConfigurations = {
        from: 'contactme@sakahsmabansal.com', // Sender email address
        to: email, // Recipient email address
        subject: "Contact Kartik Yadav", // Email subject
        text: s // Email body text
    };
    const mailConfigurations2 = {
        from: 'contactme@sakahsmabansal.com', // Sender email address
        to: "sakshambansal743@gmail.com", // Recipient email address
        subject: "Contact Kartik Yadav", // Email subject
        text: `${email} want to talk to you about ${topic}`
    };

    // Send the email
    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
            resp.send({
                status: "Invaild email"
            })
        } else {
            console.log('Email Sent Successfully');
            console.log(info);
        }
    });
    transporter.sendMail(mailConfigurations2, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
            resp.send({
                status: "Invaild email"
            })
        } else {
            console.log('Email Sent Successfully');
            console.log(info);
        }
    });

    resp.send({
        status:"Mail sent successfully"
    })

})

const PORT = process.env.PORT || 8080;
const server = http.createServer(app)
server.listen(PORT, () => {
    console.log("Server is running on the port", PORT)
})
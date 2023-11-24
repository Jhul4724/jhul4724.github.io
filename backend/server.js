const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read configuration from conf.json
const rawdata = fs.readFileSync('./backend/conf.json');
const CONFIG = JSON.parse(rawdata);

app.post('/submit', (req, res) => {
    const { name, email, phone, information } = req.body;

    // Set up nodemailer with your email provider
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CONFIG.mail.user,
            pass: CONFIG.mail.password
        }
    });

    const mailOptions = {
        from: CONFIG.mail.user,
        to: CONFIG.admin.email,
        subject: 'InnovaTech - New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInformation: ${information}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'Email sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
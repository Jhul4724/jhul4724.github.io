const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const portHTTP = 3000;  // Default HTTP port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Read the content of the file
const rawdata = fs.readFileSync('./conf.txt', 'utf-8');

// Parse the content as JSON
const CONFIG = JSON.parse(rawdata);

app.post('/submit', (req, res) => {
    const { name, email, phone, information } = req.body;
    console.log('req.body is', req.body);

    // Log that a message has been received and the name
    console.log(`Received message from: ${name}`);

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

// Create an HTTP server
app.listen(portHTTP, () => {
    console.log(`HTTP Server is running on port ${portHTTP}`);
});

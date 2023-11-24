const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const https = require('https');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Read the content of the file
const rawdata = fs.readFileSync('./conf.txt', 'utf-8');

// Parse the content as JSON
const CONFIG = JSON.parse(rawdata);

// Load SSL/TLS certificates
const privateKey = fs.readFileSync('private-key.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.post('/submit', (req, res) => {
    const { name, email, phone, information } = req.body;

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

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
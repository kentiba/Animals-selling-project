const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//Sent a new Message to Admin from user
router.post('/', (req, res) => {
    const {name, message, email} = req.body;
    const information = `
    <div>
        <h1> Thank you for reaching out to us </h1>
        <h2> Below you can find all the details of your message</h2>

        <h3>Name: <strong>${name}</strong></h3>
        <h3>Email: <strong>${email}</strong></h3>
        <h3>Message: <strong>${message}</strong></h3>
         
        <h3 style="color: blue">This email is a confirmation that we received your message and our team is going to reply in the next 24h</h3>
    </div>
    `;

    // create reusable transporter object using the default SMTP transport
    //using a disposable email currently. Chnage later to the actual address
    let transporter = nodemailer.createTransport({
        host: 'smtp.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: 'temporary_email112@yahoo.com',
            pass: 'temp123456',
        },
        debug: false,
        logger: true,
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'temporary_email112@yahoo.com', // sender address
        to: `${email} , temporary_email112@yahoo.com`, // list of receivers
        subject: 'New Message', // Subject line
        html: information, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).json(err);
        }
        res.status(200).json('Email sent');
    });
});

module.exports = router;

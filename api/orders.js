const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Client = require('../models/Clients');
const nodemailer = require('nodemailer');
const dayjs = require('dayjs');

//Age convertor. Converts date of birth to age
const Age = dateOfBirth => {
    if (dayjs().diff(dateOfBirth, 'year') >= 1) {
        return dayjs().diff(dateOfBirth, 'year') + ' Years';
    } else if (dayjs().diff(dateOfBirth, 'month') >= 1) {
        return dayjs().diff(dateOfBirth, 'month') + ' Months';
    } else {
        return dayjs().diff(dateOfBirth, 'day') + ' Days';
    }
};

//Add a new product
router.post('/', (req, res) => {
    const {name, phone, note, email} = req.body[0];
    const product = req.body[1];
    const productList = product.map(pro => {
        //convert weight from grams to kg
        const weight = pro.weight / 1000;
        return `<tr>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${
                    pro.id
                }</td>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${Age(
                    pro.dateOfBirth,
                )}</td>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${weight}</td>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${
                    pro.sex
                }</td>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${
                    pro.breed
                }</td>
                <td style="text-align: center; padding : 3px; border-bottom: 1px solid #ddd;">${
                    pro.location
                }</td>
            </tr>`;
    });
    const Note = note.length === 0 ? 'no notes' : note;
    const information = `
    <div>
        <h1> New order request </h1>
        <h2> Below you can find all the details of your request</h2>
        <ul>
            <li> Name: ${name} </li>
            <li> Phone Number: ${phone} </li>
            <li> Email: ${email} </li>
            <li> Note: ${Note} </li>
        <ul>
        <h1>Orders</h1>
        <table>
            <thead>
                <tr>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">ID</th>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">Age</th>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">Weight</th>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">Sex</th>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">Breed</th>
                    <th scope='col' style="border-bottom: 1px solid #ddd;">Location</th>
                </tr>
            </thead>
            <tbody>${productList}</tbody>
        </table>
        <h3 style="color: blue">This email is a confirmation that we received your request and currently our team is working on it . We will contact you as soon as possible</h3>
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
        subject: 'New order', // Subject line
        html: information, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).json(err);
            console.log('sendMail' + err);
        } else {
            Client.create({
                name,
                note,
                phone,
                email,
            })
                .then(cli => {
                    product.map(prod => {
                        //we can use createOrder here since we set up the
                        //assosciation between Order and Client in app.js
                        cli.createOrder({
                            productId: prod.id,
                            dateOfBirth: prod.dateOfBirth,
                            weight: prod.weight,
                            sex: prod.sex,
                            breed: prod.breed,
                            location: prod.location,
                            description: prod.description,
                        }).catch(err => {
                            res.status(400).json(err);
                            console.log('createOrder' + err);
                        });
                    });
                })
                .catch(err => {
                    res.status(400).json(err);
                    console.log('afterCreateOrder' + err);
                });

            res.status(200).json('Email sent');
        }
    });
});

//Get list of the orders
router.get('/', (req, res) => {
    Order.findAll()
        .then(order => {
            res.json({
                data: order,
            });
        })
        .catch(err => res.status(404).json(err));
});
module.exports = router;

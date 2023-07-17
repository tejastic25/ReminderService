const { PORT } = require('./config/server-config');
const express = require('express');
const bodyParser = require('body-parser');
const sendBasicEmail = require('./service/email-service');
var cron = require('node-cron');


const PrepareandStartServer = () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))


    app.listen(PORT, async () => {
        console.log(`server started on PORT : ${PORT}`);
        sendBasicEmail(
            'tejastic25@gmail.com',
            'lci2021034@iiitl.ac.in',
            'support haazir hai janab',
            'hello this is from nodemailer'

        );

        //cron - schedules task

        cron.schedule('*/10 * * * * *', () => {
            console.log('running a task every minute');
        });
    })
}
PrepareandStartServer();
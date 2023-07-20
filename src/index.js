const { PORT, REMINDER_BINDING_KEY } = require('./config/server-config');
const express = require('express');
const bodyParser = require('body-parser');
const sendBasicEmail = require('./service/email-service');
var cron = require('node-cron');
const router = express.Router();
const sequelize = require('sequelize');
const db = require('./models/index')
const apiRoute = require('./routes/index');
const SetupJobs = require('./utils/jobs');
const { publishMessage, CreateChannel, subscribeMessage } = require('./utils/messageQueue');

const PrepareandStartServer = () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/api', apiRoute);
    // SetupJobs(); 
    app.listen(PORT, async () => {
        console.log(`server started on PORT : ${PORT}`);
        if (process.env.SYNC_DB) {
            db.sequelize.sync({ alter: true });
        }

        const channel = await CreateChannel();

        subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);
        // sendBasicEmail(
        //     'tejastic25@gmail.com',
        //     'lci2021034@iiitl.ac.in',
        //     'support haazir hai janab',
        //     'hello this is from nodemailer'

        // );

        //cron - schedules task
        // cron.schedule('*/10 * * * * *', () => {
        //     console.log('running a task every minute');
        // });
    })
}
PrepareandStartServer();
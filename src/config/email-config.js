const { EMAIL_ID, PASS } = require('./server-config');
const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth: {
            user: EMAIL_ID,
            pass: PASS
        }
    }
)
module.exports = sender
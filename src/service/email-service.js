const sender = require('../config/email-config');


const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {

        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        })
        console.log(response);

    } catch (error) {
        throw error;
    }
}
module.exports = sendBasicEmail;

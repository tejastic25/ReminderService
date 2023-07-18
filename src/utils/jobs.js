var cron = require('node-cron');
const emailService = require('../service/email-service');
const sender = require('../config/email-config');

/**
 * 10:00 am 
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent 
 * by now  and is pending
 */

const SetupJobs = async () => {

    // cron - schedules task
    cron.schedule('*/100 * * * *', async () => {
        const response = await emailService.fetchPendingEmail();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recipientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, { status: "SUCCESS" });
                }
            });
        });
        console.log(response);
    });
}


module.exports = SetupJobs;
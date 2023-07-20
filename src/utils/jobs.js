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
    cron.schedule('*/10 * * * * *', async () => {
        const response = await emailService.fetchPendingEmail();
        response.forEach(async (email) => {
            console.log(email);
            //  await   emailService.sendBasicEmail(
            //         "reminderservice@airline.com",
            //         email.recipientEmail,
            //         email.subject,
            //         email.content
            //     )

            sender.sendMail({
                to: email.recipientEmail,
                subject: email.subject,
                text: email.content
            }
                , async (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        console.log("update started");
                        await emailService.updateNotification(email.id, { status: "SUCCESS" });
                        console.log("updated");
                    }
                });
        });
        // console.log(response);
    });
}


module.exports = SetupJobs;
const sender = require('../config/email-config');
const NotificationRepository = require('../repository/ticket-repository');
const notificationRepository = new NotificationRepository();

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
        console.log("something went wrong in the service layer");
        throw error;
    }
}

const fetchPendingEmail = async (timestamp) => {
    try {
        const notification = await notificationRepository.get({ status: "PENDING" });
        return notification;
    } catch (error) {
        console.log("something went wrong in the service layer");
        throw error;
    }
}

const updateNotification = async (ticketId, data) => {
    try {
        const notification = await notificationRepository.update(ticketId, data);
        return notification;
    } catch (error) {
        console.log("something went wrong in the service layer");
        throw error;
    }
}

const createNotification = async (data) => {
    try {
        const notification = await notificationRepository.create(data);
        return notification;
    } catch (error) {
        console.log("something went wrong in the service layer");
        throw error;
    }
}

const subscribeEvents = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid event received');
            break;
    }
}

// const subscribeEvents = async (payload) => {
//     let service = payload.service;
//     let data = payload.data;
//     switch(service) {
//         case 'CREATE_TICKET':
//             await createNotification(data);
//             break;
//         case 'SEND_BASIC_MAIL':
//             await sendBasicEmail(data);
//             break;
//         default: 
//             console.log('No valid event received');
//             break;
//     }
// }


module.exports = {
    sendBasicEmail, fetchPendingEmail, updateNotification, createNotification, subscribeEvents
};

const { NotificationTicket } = require('../models/index');
// const notificationticket = require('../models/notificationticket');
const { Op } = require('sequelize');
class NotificationRepository {
    async create(data) {
        try {
            const notification = await NotificationTicket.create(data);
            // console.log(notification);
            return notification;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);
            throw error;
        }
    }
    async get(filter) {
        try {
            const notification = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return notification;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
    async getAll() {
        try {
            const notification = await NotificationTicket.findAll();
            return notification;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
    async update(ticketId, data) {
        try {
            const notification = await NotificationTicket.findByPk(ticketId);
            if (data.status) {
                notification.status = data.status
            }
            await notification.save();
            // console.log("update done");
            return notification

        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
}
module.exports = NotificationRepository;
const TicketService = require('../service/email-service');
const { StatusCodes } = require('http-status-codes')

const create = async (req, res) => {
    try {
        const notification = await TicketService.createNotification(req.body);
        return res.status(200).json({
            data: notification,
            succes: true,
            message: "successfully registered email notification reminder",
            err: {}
        });

    } catch (error) {
        return res.status(401).json({
            data: {},
            succes: false,
            message: "unable to register email notification reminder",
            err: error
        });
    }
}

module.exports = {
    create
}
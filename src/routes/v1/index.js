const express = require('express');
const router = express.Router();
const TicketController = require('../../controllers/ticket-controller');
// const p =  (req, res, next) => {
//     console.log("wait");
//     return res.status(400).json({
//         data: {},
//         success: false,
//         message: "invalid request body for creating flight",
//         err: "missing mandatory property required to create a flight"
//     });
//     next();
// }
// tickets route
router.post('/tickets', TicketController.create);

module.exports = router;

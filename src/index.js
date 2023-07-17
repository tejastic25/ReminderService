const { PORT } = require('./config/server-config');
const express = require('express');
const bodyParser = require('body-parser');

const PrepareandStartServer = () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(PORT, async () => {
        console.log(`server started on PORT : ${PORT}`);
    })
}
PrepareandStartServer();
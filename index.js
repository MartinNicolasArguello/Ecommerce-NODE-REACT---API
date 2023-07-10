const express = require("express");
require("./config/db");
const cors = require("cors");
const server = express();
const PORT = 3000;

server.use(cors());
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/", require("./guitars/router"))
server.listen(PORT, (err) => {
    err ? console.log("Server down") :

        console.log('\x1b[34m', `Server up at: http://localhost:${PORT}`)
});

//ERROR HANDLING//
server.use((req, res, next) => {
    console.log("ERROR 404")
    let error = Error("Not found")
    error.status = 404
    next(error)
});

server.use((error, req, res, next) => {
    console.log("MANEJO GENERAL")
    if (!error.status) {
        error.status = 400
    }
    console.log(error.message)

    res.status(error.status).json({ status: error.status, message: error.message })
});
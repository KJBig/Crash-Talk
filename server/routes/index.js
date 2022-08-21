const express = require("express");
const path = require('path');
const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.DB_port,
    database: process.env.database,
});
connection.connect();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.post("/login", (req, res) => {
    //res.send({ data: { validity: true } });
    if (req.headers.header === "LOGIN_USER") {
        //DB 확인
        //DB에 겹치는게 있으면
        res.send({data: {user: "", validity: true}});
    }
});

router.post("/register", (req, res) => {
    //res.send({ data: { validity: true } });
    console.log(req.body);
    console.log(req.headers.header === "REGISTER_USER");

    if (req.headers.header == "REGISTER_USER") {
        console.log(req.body);
        let sql = 'INSERT INTO user VALUES (?, ?, ?, ?, ?)';

        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let nick_name = req.body.nickname;
        let symbol_id = 1
        let params = [name, email, password, nick_name, symbol_id];

        connection.query(sql, params,
            (err, rows, fields) => {
                res.send(false);
                console.log(err);
                console.log(rows);
            })
    }
});

router.post("/home", (req, res) => {
    if (req.headers.header === "JOIN_ROOM") {
    }
});

router.post("/room", (req, res) => {
    if (req.headers.header === "") {
    }
});


module.exports = router;

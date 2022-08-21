const express = require("express");
const path = require('path');
const router = express.Router();

const { connection } = require('../app');

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

    if (req.headers.header === "REGISTER_USER") {
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

        // push 성공 시, validity true 반환
        //
        // const data = {
        //   validity: true,
        // };
        // res.send(data);
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

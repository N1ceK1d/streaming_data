const express = require('express');
const mysql = require('mysql2');
const JSONStream = require("JSONStream");

require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    database: process.env.mysql_database,
    password: process.env.mysql_passwprd
});

connection.connect((err)=> {
    if(err) {
        console.log(err);
    } else {
        console.log("Вы успешно подключились");
    }
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const queryStream = connection.query(`SELECT * FROM rooms limit 10000;`).stream();
    queryStream.pipe(JSONStream.stringify()).pipe(res); 
})

app.listen(3000);
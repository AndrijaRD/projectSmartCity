const express = require('express');
const mysql = require('mysql2');   // For accessing the Database
const cors = require('cors');      // For allowing cross-origin resource sharing
const bcrypt = require('bcrypt');  // For encription
require('dotenv').config();        // For loading credentials from '.env' file

const app = express();
const port = 4001;

// Distance per kilometer
// This is the coordinate distance between two points that are 1km a part
const dpk = 0.00899322

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}); // This where we are loading database credentials from .env file

db.connect((err) => {
    if (err) { console.log('[API][DATABASE] Not connected.'); process.exit(1); }
    console.log('[API][DATABASE] Connected.');
});

const y = "\x1b[33m" // yellow
const b = "\x1b[34m" // blue
const g = "\x1b[32m" // green
const w = "\x1b[0m"  // default-white
const r = "\x1b[31m" // red
const u = "\x1b[4m"  // underline
const d = "\x1b[0m"  // default text-formating
const o = "\x1b[1m"  // bold text

/*
insert into sensorMetrics(metric, unit, dangerZone) values("brzina vetra", "m/s", "-1|-1|17|27");

*/

const generateToken = () => [...Array(16)].map(() => Math.random().toString(36)[2]).join('');

//------------------------------------------------------------//
// ---------------------- R O U T E S ------------------------//
//------------------------------------------------------------//

app.post("/account/login", async (req, res) => {
    const [[user]] = await db.promise().query(`SELECT * FROM users WHERE email="${req.body.email}"`)
    if(user.password !== bcrypt.hashSync(req.body.password, user.salt)) return res.status(200).json({found: false})
    const token = generateToken()
    await db.promise().query(`insert into activeTokens(userId, token) values(${user["userId"]}, "${token}")`)
    return res.status(200).json({found: true, token: token, admin: user.admin})
})

app.post("/account/signup", async (req, res) => {
    const salt = bcrypt.genSaltSync();
    const command = "insert into users(name, email, birthdate, password, salt) " +
    `values("${req.body['name']}", "${req.body['email']}", "${req.body['birthdate']}", "${bcrypt.hashSync(req.body['password'], salt)}", "${salt}");`;
    try{
        const token = generateToken()
        const [user] = await db.promise().query(command)
        db.promise().query(`insert into activeTokens(userId, token) values(${user["insertId"]}, "${token}")`)
        res.status(200).json({succesfull: true, token: token})
    } catch (error) {
        console.log(error)
        res.status(200).json({succesfull: false})
    }
})



app.listen(port, () => {
    console.log(`\n\n\n${y}[--------------${y}|${w} SERVER IS ONLINE ${y}|${y}--------------]${w}`)
    console.log(`[LOG][API] Server is running on Port ${port}. http://localhost:4001`)
})
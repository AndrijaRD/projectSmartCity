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

// Distance per 1/thousand of coordinate (0.001)
// This is how many km are in one thousands of a coordinate distance
const dpt = 0.11119487;

// |---------|
// 1km = 0.009 coordinates

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

const aboutTexts = {
    "MCUs": "This table is for listing all microcontrollers and there specifications.",
    "users":  "This table is for listing all users and there data including there premission levels.",
    "MPs": "This table is for listing all Measurement Possitions with there device model and location",
    "devices": "This table is for listing all devices that will be used as MPs.",
    "batteries": "This table is for listing all batteries and there specifications.",
    "metrics": "This table is for listing all metrics and there unit of measurement and there warning and danger zones.",
    "logs": "This table is for listing all the changes that have happened to the DB trough this UI.",
}
/*
insert into sensorMetrics(metric, unit, dangerZone) values("brzina vetra", "m/s", "-1|-1|17|27");

*/

function waitUntil(conditionFunc, delay = 100) {
    return new Promise(resolve => {
        const checkCondition = () => conditionFunc() ? resolve() : setTimeout(checkCondition, delay);
        checkCondition();
    });
}

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

app.post("/air", async (req, res) => {
    const [lat, lng] = req.body.location
    const token = req.body.token
    const [[ tokenData ]] = await db.promise().query(`SELECT * FROM activeTokens WHERE token="${token}"`)
    if(tokenData===undefined) return res.status(200).json({status: 400, data: {}})
    const latMax = lat + dpt*5
    const latMin = lat - dpt*5
    const lngMax = lng + dpt*5
    const lngMin = lng - dpt*5
    const [ sensors ] = await db.promise().query(`SELECT * FROM MP WHERE latitude<${latMax} and latitude>${latMin} and longitude<${lngMax} and longitude>${lngMin};`)
    console.log(sensors)
    res.status(200).json({status: 200, data: {}})
})

const getUserFromToken = async (token) => (await db.promise().query(`select userId from activeTokens where token="${token}"`))[0][0]['userId']
const getPremissions = async (userId) => await db.promise().query(`select premissions from users where userId=${userId}`)

app.post("/admin/getTables", async (req, res) => {
    const userId = await getUserFromToken(req.body.token)
    if(userId < 1) return res.status(200).json({status: "Failed Login"})
    if(getPremissions(userId) <= 1) res.status(200).json({status: "Failed Auth"})
    const tablesRaw = (await db.promise().query("show tables"))[0].map(tableObj => tableObj[Object.keys(tableObj)[0]])
    const tableData = []
    const tableDescriptions = []
    const tableAboutTexts = []
    const tableNames = []
    tablesRaw.forEach(async table => {
        if(table==="activeTokens") return
        tableNames.push(table)
        tableDescriptions.push((await db.promise().query(`describe ${table}`))[0])
        tableAboutTexts.push(aboutTexts[table])
        const d = (await db.promise().query(`select * from ${table}`))[0]
        console.log(d)
        tableData.push(d)
    })
    await waitUntil(() =>   {
        console.log("\nChecking...")
        console.log(`[${tablesRaw.length-1===tableNames.length?"1":"0"}] tableNames(${tableNames.length}/${tablesRaw.length-1})`)
        console.log(`[${tablesRaw.length-1===tableDescriptions.length?"1":"0"}] tableDescriptions(${tableDescriptions.length}/${tablesRaw.length-1})`)
        console.log(`[${tablesRaw.length-1===tableAboutTexts.length?"1":"0"}] tableAboutTexts(${tableAboutTexts.length}/${tablesRaw.length-1})`)
        console.log(`[${tablesRaw.length-1===tableData.length?"1":"0"}] tableData(${tableData.length}/${tablesRaw.length-1})`)

        return  (tablesRaw.length-1===tableNames.length)&&
                (tablesRaw.length-1===tableDescriptions.length)&&
                (tablesRaw.length-1===tableAboutTexts.length)&&
                (tablesRaw.length-1===tableData.length)
    })
    res.status(200).json({
        status: "Success", 
        tableData: tableData, 
        tableDescriptions: tableDescriptions,
        tableAboutTexts: tableAboutTexts,
        tableNames: tableNames
    })
    console.log("Sent Data!")
})



app.listen(port, () => {
    console.log(`\n\n\n${y}[--------------${y}|${w} SERVER IS ONLINE ${y}|${y}--------------]${w}`)
    console.log(`[LOG][API] Server is running on Port ${port}. http://localhost:4001`)
})
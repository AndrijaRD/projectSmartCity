const express = require('express');
const mysql = require('mysql2');   // For accessing the Database
const cors = require('cors');      // For allowing cross-origin resource sharing
require('dotenv').config();        // For loading credentials from '.env' file
const logClass = require('./modules/logClass.js');
const calculateDistance = require('./modules/calculateDistance.js')
const getRandomNum = require('./modules/getRandomNum.js');
const bcrypt = require('bcrypt');
const generateToken = require('./modules/generateToken.js')
const saveToken = require('./modules/saveToken.js')

//------------------------------------------------------------//
// ------------------- C O N S T A N T S ---------------------//
//------------------------------------------------------------//

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

function generatePasswordHash(){
    const salt = bcrypt.genSaltSync(10);
    console.log("HASH: " + bcrypt.hashSync("password", salt))
    console.log("SALT: " + salt)
}

db.connect((err) => {
    if (err) { console.log('[API][DATABASE] Not connected.'); process.exit(1); }
    console.log('[API][DATABASE] Connected.');
    generatePasswordHash()
});

const y = "\x1b[33m" // yellow
const b = "\x1b[34m" // blue
const g = "\x1b[32m" // green
const w = "\x1b[0m"  // default-white
const r = "\x1b[31m" // red
const u = "\x1b[4m"  // underline
const d = "\x1b[0m"  // default text-formating
const o = "\x1b[1m"  // bold text

//------------------------------------------------------------//
// ---------------------- R O U T E S ------------------------//
//------------------------------------------------------------//

// ROUTE FOR GETTING AIR SENSOR MEASUREMENTS
app.get("/sensors/air/:latitude/:longitude", async (req, res) => {
    const log = new logClass(
        [
            {s: true, m: "Returned sesnsor data sucessfully."},
            {s: false, m: "Failed to return sesnor data."}
        ],
        req, res
    );

    // First i am getting all running sensors
    const [sensors] = await db.promise().query("select * from AIR_SENSORS where running;")
    console.log("Lat: " + req.params.latitude + ", Lng: " + req.params.longitude)

    // Then i am calculating there distances from user
    const distances = []
    sensors.map(sensor => distances.push({
        d: calculateDistance(req.params.latitude, req.params.longitude, sensor.latitude, sensor.longitude),
        id: sensor.id
    }))
    
    //  Then sorting the list from closest to farthest
    distances.sort((a, b) => a.d - b.d)

    // Now i am getting last measurements from top 3 closest sensors and sending them
    const data = []
    const promises = distances.map(async (item, i) => {
        // In this loop i am filling the list "data" with object represeting all running sesnors

        const sensor = sensors.find(sensorItem => sensorItem.id === item.id);
        if(!sensor) return

        // If current sensor is one of the top3 it also passes there last measurement in the prop "measurement"
        if (i < 3){
            // Measurement fetching
            const [[measurement]] = await db.promise().query(`SELECT * FROM AIR_MEASUREMENTS WHERE sensor = ${item.id} ORDER BY id DESC LIMIT 1;`)
            
            if(measurement){
                // Deleting non-measurement data
                delete measurement.id
                delete measurement.date
                delete measurement.time
                delete measurement.sensor
            }
            
            // pushing formated data
            data.push({
                active: true, // is one of the top3 (true)
                location: [sensor['latitude'], sensor['longitude']],
                id: item.id,
                measurement: measurement ? measurement : { unavailable: "Error" } // If there was no measuements with this sensor just return Error object
            })
        } else {
            // If current sensor was not one of the top3 just pass his id and location
            data.push({
                active: false, // is one of the top3 (flase)
                location: [sensor['latitude'], sensor['longitude']],
                id: item.id,
                measurement: {}
            })
        }
    })

    // Waiting for all sensors to be added to data list
    
    Promise.all(promises)
    .then(_ => {
            console.log(data.map(s => s.active?s.id:""))
            return log.end(0, data)
        })
    .catch(error => log.end(1));
    
})

app.post("/account/login", async (req, res) => {
    const log = new logClass(
        [
            {s: true, m: "User Logged in."},
            {s: true, m: "User Failed to Log in."},
            {s: false, m: "Failed to check Log in. Error"}
        ],
        req, res
    );
    try {
        const [[userData]] = await db.promise().query(`SELECT * FROM USERS WHERE email="${req.body['email']}"`);
        if (!userData) return log.end(1, {"matching": false});
        if ((await bcrypt.hash(req.body['password'], userData.salt)) === userData.password){
            const token = generateToken();
            db.promise().query(`insert into ACTIVE_TOKENS(user, token) values("${userData.id}", "${token}")`)
            return log.end(0, {"matching": true, "token": token})
        }
        else return log.end(1, {"matching": false});
    } catch (error) { return log.end(2, {"matching": false}, error);}
});

// ROUTE FOR CREATING NEW AIR SENSOR INSTANCE
app.post("/sensors/air", async (req, res) => {
    const log = new logClass(
        [
            {s: true, m: "Sucessfully created new Air Sensor instance."},
            {s: false, m: "Failed to create new Air Sensor instance."}
        ],
        req, res
    );
    req.body.forEach(async sensor => await db.promise().query(`insert into AIR_SENSORS(latitude, longitude) value(${sensor[0]}, ${sensor[1]});`))
    return log.end(0) // I havent implemeted error cathcing logic yet so we just return good message always
})


// ROUTE FOR GENERATING RANDOM AIR MOCK DATA (MEASUREMENTS) ("num" is how many item should be generated)
app.post("/sensors/air/mockData/:num", async (req, res) => {
    const log = new logClass(
        [
            {s: true, m: `Sucessfully generated ${req.params.num} mock air measurements.`},
            {s: false, m: `Failed to generate ${req.params.num} mock air measurements.`}
        ],
        req, res
    );
    for (let i=0; i < req.params.num; i++){
        const fullMonths = [1, 3, 5, 7, 8, 10, 12]
        // Math.min() or Math.max() are used so i cant get over or under allowerd boundaries but still giving all numbers equal chance
        // If i generate month 0 or day 0 it will replace it with 1 (bc there is no day 0 in the month)
        let month = Math.round( Math.max(Math.random()*12, 1) )
        let monthMltp = fullMonths.includes(month) ?    31 : // if month is one of the 31-days months
                        month===2                  ?    28 : // if month is not one of the 31-days months but its februar
                                                        30   // if month is one of the 30-days months
        let day = Math.round(   Math.max(Math.random()*monthMltp, 1) )
        const date = `2023-${month}-${day}`

        // If hour, minute or second is generated with its full form (24, 60, 60) it will correct it (23, 59, 59)
        const hour = Math.round( Math.min(Math.random()*24, 23) )
        const min = Math.round(  Math.min(Math.random()*60, 59) )
        const sec = Math.round(  Math.min(Math.random()*60, 59) )
        const time = `${hour}:${min}:${sec}`

        await db.promise().query(
            "insert into AIR_MEASUREMENTS(date, time, sensor, temperature, humidity, wind, gas, methane, radiation, particles) values(" + 
                `"${date}", ` + 
                `"${time}", ` + 
                (getRandomNum(99, 0)+1) + ", " +
                getRandomNum(32) + ", " + 
                getRandomNum(100) + ", " +
                getRandomNum(20) + ", " +
                getRandomNum(100) + ", " +
                getRandomNum(60) + ", " +
                getRandomNum(256) + ", " +
                getRandomNum(10) + 
            ");"
        )
    }
    
    return log.end(0, {"status": "done"}) // I havent implemeted error cathcing logic yet so we just return good message always
})


app.get("/statistics/air/:latitude/:longitude/:radius", async (req, res) => {
    const lat = req.params.latitude
    const lng = req.params.longitude
    const radius = req.params.radius;
    const [sensorsRaw] = await db.promise().query("SELECT * FROM AIR_SENSORS;")
    const sensors = [];
    sensorsRaw.map(sen => {
        sen.d = calculateDistance(lat, lng, sen.latitude, sen.longitude)
        if(sen.d <= dpk*radius) data.push(sen)
    });
    

    res.status(200).json({sensors: sensors, measurements: measurements});
})

app.listen(port, () => {
    console.log(`\n\n\n${y}[--------------${y}|${w} SERVER IS ONLINE ${y}|${y}--------------]${w}`)
    console.log(`[LOG][API] Server is running on Port ${port}. http://localhost:4001`)
})
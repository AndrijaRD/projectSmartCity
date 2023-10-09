const express = require('express');
const mysql = require('mysql2');   // For accessing the Database
const cors = require('cors');      // For allowing cross-origin resource sharing
require('dotenv').config();        // For loading credentials from '.env' file
const logClass = require('./modules/logClass');
const calculateDistance = require('./modules/calculateDistance.js')

//------------------------------------------------------------//
// ------------------- C O N S T A N T S ---------------------//
//------------------------------------------------------------//

const app = express();
const port = 4001;

const senors_get_link = "/get-sensors/:latitude/:longitude"
const sensor_weather_insert_link = "/insert/weather/:sensor/:temperature/:humidity"

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}); // This where we are loading your database credentials from .env file

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


//------------------------------------------------------------//
// -------------------- F U C T I O N S ----------------------//
//------------------------------------------------------------//

// Incremets given id and returns the new one. Example: WTH_000000001 => WTH_000000002
const incrementId = id => id.replace(/\d+/, num => String(+num + 1).padStart(num.length, '0'));

// Name explains it very well, it return Date and time.
function getDateTime(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`
}



//------------------------------------------------------------//
// ---------------------- R O U T E S ------------------------//
//------------------------------------------------------------//


app.get(senors_get_link, async (req, res) => {
    const log = new logClass(
        [
            { s: true, m: "Successfully returned sensor list." },
            { s: false, m: "Failed to return sensor list."}
        ],
        req, res
    )
    const userLatitude = req.params.latitude;
    const userLongitude = req.params.longitude;
    try{ 
        const [sensors] = await db.promise().query("select * from WEATHER_SENSORS where running=true;"); //Getting all working sensors
        const distances = []

        sensors.forEach(sensor => { // For each sensor canculating distance and adding it to the disatnces list
            distances.push({
                id: sensor.id,
                d: calculateDistance(userLatitude, userLongitude, sensor.latitude, sensor.longitude)
            })
        })
        distances.sort((a, b) => a.d - b.d)
        log.end(0, distances); // I am printing the message 0, which returns the list by default and prints that request was successfull.

    } catch (error) {
        log.end(1, {status: 400}, error); // I am printing message at index 1, which is the bad one
        //                                   Im also return to the user {status: 500}
        //                                   And im printing erro into .log file
    }
})


// This route is for Weather Sensor
// /sensor/weather/insert/WTHSEN_000001/34.7/48.6
app.get(sensor_weather_insert_link, async (req, res) => {
    const log = new logClass([
        { s: true, m: `Successfully saved ${req.params.sensor} sensor's measurement. `},
        { s: false, m: `Failed to save ${req.params.sensor} sensor's measurement.`}
    ])
    try{
        const [rows] = await db.promise().query("select MAX(id) from WEATHER_MEASUREMENTS"); // GET LAST ID FROM WTH TABLE
        let lastID = rows[0]['MAX(id)'];
        lastID === null ? lastID = "MEA_000000" : "" // In case query didnt return anything (meaning table was empty)
        
        const dateTime = getDateTime()
        command = "insert into WEATHER_MEASUREMENTS values(" +
            `"${incrementId(`${lastID}`)}", ` +         // MEASUREMENT ID
            `"${dateTime.split(" ")[0]}", ` +           // MEASUREMENT DATE
            `"${dateTime.split(" ")[1]}", ` +           // MEASUREMENT TIME
            `"${req.params.sensor}", ` +                // MESUREMENT SENSOR
            ` ${req.params.temperature}, ` + 
            ` ${req.params.humidity});`

        await db.promise().query(command);
        return log.end(0);
    } catch (error){
        return log.end(1, {status: 400}, error)
    }
    
})

app.listen(port, () => {
    console.log(`\n\n\n${y}[--------------${y}|${w} SERVER IS ONLINE ${y}|${y}--------------]${w}`)
    console.log(`[LOG][API] Server is running on Port ${port}. http://localhost:4001`)
})
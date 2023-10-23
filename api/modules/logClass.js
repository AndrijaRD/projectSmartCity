const getDateTime = require('./modules/getDateTime.js')

const y = "\x1b[33m" // yellow
const b = "\x1b[34m" // blue
const g = "\x1b[32m" // green
const w = "\x1b[0m"  // default-white
const r = "\x1b[31m" // red
const u = "\x1b[4m"  // underline
const d = "\x1b[0m"  // default text-formating
const o = "\x1b[1m"  // bold text

/*
This class is made to make debugging and bug catching much easier.
It prints loggs in the terminal in a specific format and with session ids
Just create its instance at the start of each route, give it message list, req and res, and u are ready to go :)

Example:

app.get("/some/endpoint", (req, res) => {
    const log = new logClass(
        [ 
            {s: true, m: "Function ended without errors"},
            {s: flase, m: "Function had errors."}
        ],
        req, res
    )
})

// So in the list are placed messages that can be console.logged (
// s is short for status - was it good, or bad, 
// and m is short for message - string that will be printed with the status

and when u want to end the route, return data to user just use:
return log.end(id, data)

id = index of the message you want to print
data = what ever you want to return to the user

*/

class logClass {
    #messages;
    #req;
    #res;

    // messages: list of messages that will be printed but in the following form: [ {s: true/false, m: "your message"}, ... ]
    // "s" represents status of this message, is it FAIL (false) or OK (true), "m" represents the text that is printed next to the status
    // so all together is printed like "[LOG][OK/FAIL] your message."
    // req and res are properties that you get from "app.get(..., (req, res) => {})" that you need to pass to this construcor so it can extract info from req and so it can use res for returning package
    constructor(messages, req, res){
        this.#messages = messages; 
        this.#req = req;
        this.#res = res;
        this.fullConnectionLog = []
        
        // session id is specific random id that makes easier to see which request is which even if they have same ip and link origin
        this.sessionID = Math.floor(Math.random() * 4096); 
        
        if(!(messages.length===0&&req===""&&res==="")){ // this just checks if all data is available
            this.#start()
        }
    }

    // Initiate SESSION-START
    #start() { // this function prints the indicator that session (a connection) has started and what its his sessionID and some other info
        console.log(`\n[LOG][${g}SESSION-START${w}][${b + this.sessionID + w}][${this.#req.url}]`) 
        console.log(`[LOG][${y}INFO${w}][${this.#req.ip}][${getDateTime()}]`)
    }

    // id: is index for which message should me printed
    // retPackage: is response that will be returned to the user in for of json. usecase: res.status(200).json(package)
    // err: is string that will be added to the log and it represents detailed error that occured
    end(messageID = 0, retPackage = {status: 200}, err = ""){ 
        try{
            err !== "" ? console.log(err) : "" // if error text is available print it
            
            const msg = this.#messages[messageID]; // getting the message with the id that was provided

            // Prints the messages depending on the status and message text
            console.log(`[LOG][${msg.s ? g+"OK" : r+"FAIL"}${w}] ${msg.m}`)
            console.log(`[LOG][${r}SESSION-END${w}][${b + this.sessionID + w}][${this.#req.url}]`)

            // returning package only if the header hasn't been sent yet
            // this prevents error where api sends response two times and then it auto-crashes
            if(!this.#res.headersSent) this.#res.status(200).json(retPackage)
        
        } catch (err){ //  if there was error up just console log it and if header hasn't been already sent - send it
            console.log(`\n\t[LOG][CRITICAL-ERROR] ${err}`) // In case there was some program error
            if(!this.#res.headersSent) this.#res.status(400).json({status: 400})
        }
    }
}



module.exports = logClass;
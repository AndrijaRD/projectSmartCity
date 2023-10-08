// BETTER EXPLANATION WITH EXAMPLES CAN BE FOUND IN THE 'HowToSetupAndRun.md' in the root folder for this api.


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
Just create its instance at the start of each route, give it message list, req and res, and u are ready :)
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

        this.sessionID = Math.floor(Math.random() * 4096); // session id is specific random id that makes easier to see which request is which even if they have same ip and link origin
        if(!(messages.length===0&&req===""&&res==="")){
            this.#start()
        }
    }

    // Initiate SESSION-START
    #start() { 
        console.log(`\n[LOG][${g}SESSION-START${w}][${b + this.sessionID + w}][${this.#req.url}]`) 
        console.log(`[LOG][${y}INFO${w}][${this.#req.ip}][${this.#time()}]`)
    }

    // id: is index for which message should me printed
    // retPackage: is response that will be returned to the user in for of json. usecase: res.status(200).json(package)
    // err: is string that will be added to the log file and it represents detailed error that occured, so its not for printing just for logging
    end(messageID = 0, retPackage = {status: 200}, err = ""){ 
        try{
            // Pushing error into Log List but witout print it to the console
            err !== "" ? console.log(err) : ""
            const msg = this.#messages[messageID];

            // Defineing list of messages that will be both added to the Log List and printed out to console 
            console.log(`[LOG][${msg.s ? g+"OK" : r+"FAIL"}${w}] ${msg.m}`)
            console.log(`[LOG][${r}SESSION-END${w}][${b + this.sessionID + w}][${this.#req.url}]`)

            // returning package only if the header hasn't been sent yet 
            if(!this.#res.headersSent) this.#res.status(200).json(retPackage)
        
        } catch (err){ //  if there was  error up just console log it and if header hasn't been already sent - send it
            console.log(`\n\t[LOG][CRITICAL-ERROR] ${err}`)
            if(!this.#res.headersSent) this.#res.status(400).json({status: 400})
        }
    }
    #time() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
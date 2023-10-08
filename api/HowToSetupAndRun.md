
## How to setup and run

To set it up you need to have npm installed. After that you need to be in the current directory and then run the following command:
```bash
npm install package.json
```

Now that all dependencies are installed you need to configure api to run with your database, create file called '**.env**' in the same dir as you are in.
The template for this file looks like this:
```env
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=projectSmartCity
```
 - By default '**DB_HOST**' should be localhost.
 - '**DB_USER**' should default to be root
 - If you dont have password protected user just remove '**DB_PASSWORD**'.
 - And '**DB_NAME**' should be projectSmartCity if you followed the steps from DB folders '**structure.md**' file.

So all filled in shouldd look like this:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678
DB_NAME=projectSmartCity
```
Remeber that this file is by default excluded from commits using '**.git**' so any time you clone the repo you need to create this file.

&nbsp;

___


After this you are ready to run it by typing the following:
```bash
node api.js
```

&nbsp;

## Rules

 - All of the routes that api has should be defined on the top in for of a 'const var' and later used like variables.
 - All changes related to the api are made to the api.js file, and they have to be followed by comments or explained on top of them.
 - Do not delete or change other peoples comments unless you are changing the way that function works.


&nbsp;


## logClass

In the code there is class called logClass that i created and use for debugging you do not have to use it, but if you understand it, it would be recomended to use. It manages the logs very well and each requset/session from user is identified using session id that class creates and its able to handle the error of returning res multiple time.

It is used like this:

 1. You create a route
 ```js
    app.get("/some/parh", (req, res) => {
        ...
    })
 ```

 2. Then you create a logClass instance
 ```js
    const log = logClass(
        [
            { s: true, m: "My good message" },
            { s: false, m: "My bad message" }
        ],
        req, res
    );
 ```
 Here i have passed 3 arguments:
  - **Array** is a list of messages that this calss can print out, you define each message using '**s**' which stands for **status** and it can be __true__ or __false__. Once the route is done this class loggs how it went good or bad and if message that you chose to print has a '**s**' set to true it will be GOOD and if it had '**s**': flase it will print BAD. And next to the status it will print whatever you put under '**m**' which stands for message. So in my example if i later choose to use message one (index 0) it will print this: "[LOG][OK] My good message"
  - **req** is just first parameter of the route that is used so class can identify whats the users ip and what route did he request.
  - **res** is also a routes parameter, second one, and Class uses it so when u want to send some status back to the user it can manage that (there are few stupid errors that can occur and this class resolves them)
  
  3. Ending the route
  ```js
    log.end(0, {data: someData})
  ```
  or
  ```js
    log.end(1, {data: "Failed"}, error)
  ```

  Here is the first example i am printing message with index **0** (Thats the good message) and im returning to the user some json '**{data: someData}**' so what is happaing after i run this is that class is going to end the users request by sending his the json and printing in my console how did the request go (because i put good message in my console will be: "[LOG][OK] My good message").
  In the Example num 2 i ended the request with second message (index 1) and returned to the user json with **data: "Failed"**, and in my console i will see this: "[LOG][FAIL] My bad message"

Now you hopefully understand the basics of this class so at least if you see it the code you know what it does in the background, if you are more interested in how it works you can see its code in the file called '**logClass.js**'
 
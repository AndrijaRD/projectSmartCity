
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
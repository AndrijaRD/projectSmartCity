# Project Smart City

This project is about making smart IoT devices and Web applications that interact with eachother to create a echosystem. This project is made by the organization "Centar za Talente, Pancevo", it has the goal of createing better future and implementing technology that is already in our everyday lives to help automate manual and hard taskes and make it cloaser too all citizens.

# Project Organization

Project is devided in multiple sections, which are:
 * Weather
 * Traffic
 * Water
 * ...

All sections use the same database and api.

 - ***Database*** is sql based - MarianaDB, it has explicitly defined structure that can be found in the folder DB, the whole db can be run localy and filled with whatever data you want, for initial setup there is a full step by step tutorial in the folder DB, file structure.md. Any and all changes made to the database columns or its structure should be also made to the structure.md and then commited.

 - ***Api*** is made in ExpressJS, and it has handles all data from Sensor Devices to Front-End Website. It connectes to the database and then satarts listening for all traffic, from weather sensors, website clients... and so on, beofre editing any code read the .md file that is in api's root dir, it constains rules and also how to setup everything localy.

&nbsp;

## Read .md files

Before editing anything **Read** the .md files that are placed in almost every folder, especially in the DB folder, it defines the sql DB structure!

&nbsp;

---

Recomended **OS** for working on this project is **Linux**, because all commands made for seting up are made for Linux, this project can be managed using windows but all commands that are different from those shown in the .md files you need to figure out your self.




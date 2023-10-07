THIS FILE IS MEAN TO BE VIEWED FROM GITHUB OR SOME OTHER SOFTWARE THAT SUPPORTS .MD FILE PREVIEW!

### NAMING RULES: 
 - All tables have to have a name in full capittal letters
 - Multiple words are separated only by '_'

### !WARNING! 
Before changing any code or commiting a change look at the sql structure to see if anything has change, and if u your self want to change the structure of some table do it here!

## HOW TO RECREATE DATABASE LOCALY
In the same folder as this file u can find file called **projectSmartCity.sql**.
when u are in the this directory do the following:

 **1. Login into mysql console**
 ```bash
 mysql -u your-username -p
 ```
 Replace "your-username" with your mysql username.
 And if your user is not protected by password remove "**-p**"
 
 **2. Create empty database**
 ```bash
 CREATE DATABASE projectSmartCity;
 ```

 **3. Exit the sql console**
 ```sql
 exit;
 ```
 or _"Ctrl + C"_

 **4. Load the file**
 ```sql
 mysql -u "your-username" -p projectSmartCity < projectSmartCity.sql
 ```
 Replace "your-username" with your mysql username.
 And if your user is not protected by password remove "**-p**"

 &nbsp;

 And you are done, you can enter the Database eather directly from terminal:
 ```bash
 mysql -u "your-username" -p projectSmartCity
 ```
 or
 ```bash
 mysql -u "your-username" -p
 ``` 
 ```sql
 use projectSmartCity;
 ```


&nbsp;

&nbsp;

&nbsp;

&nbsp;


## TABLES OVERVIEW
Database contains following tables:
 * WEATHER_MEASUREMENTS
 * WEATHER_SENSORS

&nbsp;

&nbsp;

### Table WEATHER_SENSORS

This table contains sensors for weather measurements.
```sql
CREATE TABLE WEATHER_sensors(
    id varchar(16) PRIMARY KEY,
    latitude float not null,
    longitude float not null,
    version float default 1.0,
    running bool default true
);
```

 - **id** is a 16 character long string that represents the primary identifier for each sensor (primary key), it has the following format: WTHSEN_{num:06} = WTHSEN_000001, WTHSEN_000002, WTHSEN_000003...
 - **latitude** is a float that represents a part of sensors location, latitude.
 - **longitude** is a float that represents a part of sensors location, longitude.
 - **version** is a float representing sensors version (in case of developing multiple version of sensors).
 - **temperature** is a bool that tells if the sensor is functional at the moment.

EXAMPLE:
```sql
MariaDB [projectSmartCity]> select * from WEATHER_SENSORS;
+---------------+----------+-----------+---------+---------+
| id            | latitude | longitude | version | running |
+---------------+----------+-----------+---------+---------+
| WTHSEN_000001 |  44.8657 |   20.6426 |       1 |       1 |
| WTHSEN_000002 |  46.1032 |   22.4581 |       1 |       1 |
| WTHSEN_000003 |  43.1032 |   21.5481 |       1 |       1 |
| WTHSEN_000004 |  45.3678 |   20.5481 |       1 |       1 |
| WTHSEN_000005 |  44.9998 |   20.9492 |       1 |       1 |
| WTHSEN_000006 |  45.2456 |   21.5492 |       1 |       1 |
| WTHSEN_000007 |  47.3817 |   18.9485 |       1 |       1 |
+---------------+----------+-----------+---------+---------+

```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

### Table WEATHER_MEASUREMENTS

This table contains measurements done by weather sensors.
```sql
CREATE TABLE WEATHER_MEASUREMENTS(
    id varchar(16) PRIMARY KEY,
    date varchar(16),
    time varchar(16),
    sensor varchar(16),
    FOREIGN KEY (sensor) REFERENCES WEATHER_SENSORS(id),
    temperature float,
    humidity float
);
```

 - **id** is a 16 character long string that represents the primary identifier for each measurment (primary key), it has the following format: WTH_{num:09} = WTH_000000001, WTH_000000002, WTH_000000003...
 - **date** is a 16 character long string that represents the date of the measurement and its written in the YYYY:MM:DD format
 - **time** is a 16 character long string that represents the time of the measurement and its written in the HH:MM:SS format
 - **sensor** is a 16 character long string that represents the id of a sensor from which measurement was taken, it it a MUL key meaning it is a reference to the id of a row in the table WEATHER_SENSORS
 - **temperature** is a float representing the measured temperature
 - **humidity** is a float representing the measured humidity

EXAMPLE:
```sql
MariaDB [projectSmartCity]> select * from WEATHER_MEASUREMENTS;
+---------------+------------+----------+---------------+-------------+----------+
| id            | date       | time     | sensor        | temperature | humidity |
+---------------+------------+----------+---------------+-------------+----------+
| WTH_000000001 | 2023:10:07 | 21:48:36 | WTHSEN_000001 |        25.6 |     48.2 |
| WTH_000000002 | 2023:10:07 | 22:02:57 | WTHSEN_000001 |        24.9 |     51.7 |
| WTH_000000003 | 2023:10:08 | 02:34:12 | WTHSEN_000002 |        21.3 |     36.2 |
| WTH_000000004 | 2023:10:08 | 13:03:48 | WTHSEN_000007 |        32.8 |     52.7 |
| WTH_000000005 | 2023:10:08 | 18:52:38 | WTHSEN_000001 |        28.9 |     49.8 |
+---------------+------------+----------+---------------+-------------+----------+

```

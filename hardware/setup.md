
# Overview

This folder is for codes related to harware - sensors, systems, etc.
All libraries that were made by you or any onther contributor (non-officaial/public libraries) can be fould in the folder **'/hardware/libraries'** one example is library '**sc**' that uses esp8266 wifi and http libraries to simplfy the process of connecting to wifi or createing http or even https request.

&nbsp;

# Libraies - Setup

If you are on linux you have to:
 1. Move all folders from '**/hardware/libraries**' to '**~/Arduino/libraries/**'. You can do that by draging or dropping or you can use the following command.
 ```bash
    cp -r /path/to/the/project/harware/libraires/* ~/Arduino/libraries/
 ```
 (Dont forget that '**~**' is just short for '**/home/your_username/**' so full path would be '**/home/your_username/Arduino/libraries/**')

 2. Open ArduinoIDE and go to **File>Preferences>Additional boards manager URLs** and add the following url: "http://arduino.esp8266.com/stable/package_esp8266com_index.json"

 3. Open '**/hardware/libraries.txt**' and using **Library Manager** in ArduinoIDE install all of the libraries that are written in the file.

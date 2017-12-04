# HAGearS3
Home Assistant user interface for the Samsung Gear S3/S2 (tizen os)

## Instructions
On the first run you need to add your server url and password in the settings page. After the welcome popup comes up click ok and scroll down to settings

I am going to apologize in advance for the setup screen. These devices really weren't meant to take this type of user input. But its only two boxes and its a one time thing, so for now it will be like this.

1. To actually type in this box you need to have disabled auto complete. On the S3 you can do this by going to 

```Settings > General Management > Input > Keyboard Settings > SmartTyping > Predictive Text | OFF```

2. enter your url with the protocl and all. https://myurl.org

3. Then enter your password carefully.
4. Hit save. It should go back to the main page and you should briefly see a loading spinner. Then your list of entities should work.

At the time of writing the following entities are supported and automatically discovered:

Lights (on/off only, no dimming)
Switches
Covers (open/close only)
Scripts
Groups (on/off)

## Screenshots
![Screenshot](screenshots/home.png?raw=true)
![Screenshot](screenshots/lights.png?raw=true)

![Screenshot](screenshots/switches.png?raw=true)
![Screenshot](screenshots/covers.png?raw=true)

# HAGearS3
The Unofficial Home Assistant user interface for the Samsung Gear S3/S2 (tizen os)

## Instructions
On the first run you need to add your server url and token to the settings page. After the welcome popup comes up click ok and scroll down to settings

I am going to apologize in advance for the setup screen. These devices really weren't meant to take this type of user input. But its only two boxes and its a one time thing, so for now it will be like this.

1. To actually type in this box you need to long hold each button and swipe to the correct character. Alternatively you can disable auto complete on the S3 by going to 

```Settings > General Management > Input > Keyboard Settings > SmartTyping > Predictive Text | OFF```

2. Enter your complete url including protocol and all, e.g. https://myurl.org

3. Using a Web-Browser on your PC log in to your HomeAssistant installation and click on your profile button (the round button labeled "W" in the screenshot).

    ![Screenshot](screenshots/ha_profilebutton.png?raw=true)

4. Scroll down to the bottom and click "Create Token" in the "Long-Lived Access Tokens" section.

    ![Screenshot](screenshots/ha_createtoken.png?raw=true)


5. Enter a name for your token, e.g. GearS3 

    ![Screenshot](screenshots/ha_setname.png?raw=true)

6. Copy the shown key to your clipboard.

   ![Screenshot](screenshots/ha_copytoken.png?raw=true)

7. Enter a random text (e.g. ```random```) in the Cl1p.net Path field on your watch. 

  ![Screenshot](screenshots/settings.png?raw=true)

7.  As the token is very long, you don't want to enter it using the watch interface, so we are using an anonymous web clipboard service. Go to https://cl1p.net/random where ```random``` is your text that you haven choosen before. Paste your token and click "Create Cl1p". Don't refresh the web page afterwards because the token can be retrieved only once.

   ![Screenshot](screenshots/cl1p_copypaste.png?raw=true)

8. Hit save on your watch. It should go back to the main page and you should briefly see a loading spinner. Then your list of entities should work.

At the time of writing the following entities are supported and automatically discovered:

```
Lights (on/off only, no dimming)
Switches
Covers (open/close only)
Scripts
Groups (on/off)
```

## Screenshots
![Screenshot](screenshots/home.png?raw=true)
![Screenshot](screenshots/lights.png?raw=true)

![Screenshot](screenshots/switches.png?raw=true)
![Screenshot](screenshots/covers.png?raw=true)

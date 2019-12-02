# HAGearS3
The Unofficial Home Assistant user interface for the Samsung Gear S3/S2 (tizen os)

## Instructions
On the first run you need to add your server url and token to the app. When you run the app it will generate a unique url on the companion website www.hassgalaxy.app
Using a web browser navigate to this page and follow the below instructions

1. Enter your complete url including protocol and all, e.g. https://myurl.org or you can leave this blank if you aren't comfortable and just enter the token.

2. Using a Web-Browser on your PC log in to your HomeAssistant installation and click on your profile button (the round button labeled "W" in the screenshot).

    ![Screenshot](screenshots/ha_profilebutton.png?raw=true)

3. Scroll down to the bottom and click "Create Token" in the "Long-Lived Access Tokens" section.

    ![Screenshot](screenshots/ha_createtoken.png?raw=true)

4. Enter a name for your token, e.g. GearS3 

    ![Screenshot](screenshots/ha_setname.png?raw=true)

5. Copy the shown key to your clipboard.

   ![Screenshot](screenshots/ha_copytoken.png?raw=true)

6. Go back to the hassgalaxy site and paste this token into the token field.

7.  Hit submit. It should go back to the main page and you should briefly see a loading spinner. Then your list of entities should work.
   a. If you elected not to type in your url then it will go to the setup page instead of the entity list.
   b. You need to enter your url manually. To actually type in this box you need to long hold each button and swipe to the correct character. Alternatively you can disable auto complete on the S3 by going to 
   ```Settings > General Management > Input > Keyboard Settings > SmartTyping > Predictive Text | OFF```

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

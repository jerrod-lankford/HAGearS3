/*
 * We must declare global variables to let the validator know the
 * global variables we use.
 * To declare global variables, write global variables along with
 * default values inside a comment on top of each source code.
 * The comment should start with the keyword, global.
 */

/*global shortcuts: true*/

shortcuts = {
    /*
     * To connect to a Web app, add the appId of the Web app.
     * You can find the AppId from ``<tizen:application id="">'' in ``config.xml''
     */
    "top-left": {
        "image": "palette.png",
        "entities": "Scenes",
    },
    "left": {
        "image": "account-multiple.png",
        "entities": "Groups",
    },
    "bottom-left": {
        "image": "blinds.png",
        "entities": "Covers",
    },
    "top-right": {
        "image": "lightbulb.png",
        "entities": "Lights",
    },
    "right": {
        "image": "flash.png",
        "entities": "Switches",
    },
    "bottom-right": {
        "image": "file-document.png",
        "entities": "Scripts",
    },
    "center": {
        "image": "home-assistant.png",
        "entities": "Entities",
    }
};

(function() {
    /**
     * Launch the selected application
     * @param {String} appId - Application name that is included in appIds
     * @param {String} Entities - Type of entities to list
     */
    var launchApp = function(appId, entities) {
        var appControl = new tizen.ApplicationControl("http://home-assistant.io/appcontrol/operation/list", null,
        		null, null, [new tizen.ApplicationControlData("entities", [entities])]);
        window.tizen.application.launchAppControl(appControl, appId, null, null, null);
    };

    window.onload = function() {
        // add eventListener for tizenhwkey
        window.addEventListener('tizenhwkey', function(e) {
            if (e.keyName === 'back') { // The back key works only in the dummy web application.
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            }
        });

        for(var pos in shortcuts) {
            document.getElementById('container-' + pos).addEventListener('click', launchApp.bind(this, "LhGPLdV8nG.HomeAssistant", shortcuts[pos].entities));
            document.getElementById('container-' + pos + '-image').setAttribute('src', 'images/' + shortcuts[pos].image);
        }
    };
}());

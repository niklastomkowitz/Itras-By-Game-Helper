// require the discord.js module
const Discord = require('discord.js');

//Supported Languages

var language = ["de", "en"]
var currentLang = language[0];

const { prefix, token } = require('./config.json');
var { actionTitle, actionText } = require('./cards/'+ currentLang + '/action.json');
var { randomTitle, randomText } = require('./cards/'+ currentLang + '/random.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {

    //Start Action
    if (message.content.startsWith(`${prefix}action`)) {
        message.channel.send(startAction());
    }
    //Start Random
    if (message.content.startsWith(`${prefix}random`)) {
        message.channel.send(startRandom());
    }

    if (message.content === `&currentlang`) {
        message.channel.send(currentLang);
    }


    //Change Language
    if (message.content.startsWith(`&changelang`)) {

        for (var i = 0; i<language.length; i++){
            if (message.content === `&changelang ` + language[i]) {
                changeLanguage(language[i]);
                message.channel.send("Language changed to " + language[i]);
            }
        }
    }
});


function startAction(){

    var storeRandomNumber = Math.floor(Math.random() * actionTitle.length);

    var pickTitle = "**" + actionTitle[storeRandomNumber] + "**\n";
    var pickText = actionText[storeRandomNumber];
    var randomAction = pickTitle + pickText;

    return randomAction;
}

function startRandom(){

    var storeRandomNumber = Math.floor(Math.random() * randomTitle.length);

    var pickTitle = "**" + randomTitle[storeRandomNumber] + "**\n";
    var pickText = randomText[storeRandomNumber];
    var randomRandom = pickTitle + pickText;

    return randomRandom;
}

function changeLanguage(setLanguage){
    currentLang = setLanguage;
    
    /* Not sure how overriding the paths work
    actionTitle, actionText = require('./cards/'+ currentLang + '/action.json');
    randomTitle, randomText = require('./cards/'+ currentLang + '/random.json');
    */
}


// login to Discord with your app's token
client.login(token);
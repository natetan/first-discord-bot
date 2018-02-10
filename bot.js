const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const translate = require('google-translate-api');

const helpers = require('./helpers.js');
const languages = require('./languages.js')
const service = require('./service.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    const desc = 'I should definitely be studying rather than making a Discord bot...';
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    const prefix = '?';

    // Don't do anything there's no message
    if (!message.startsWith(prefix)) return;
    if (message.startsWith(prefix)) {
        const args = message.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();
        if (command == 'deets') {
            bot.sendMessage({
                to: channelID,
                message: `User: ${user}\nUser ID: ${userID}\nChannel ID: ${channelID}\nDescription: ${desc}`
            });
        } else if (command == 'cl') {
            bot.sendMessage({
                to: channelID,
                message: '```JavaScript' + '\nconsole.log(\'' + helpers.toString(args, ' ', false) + '\')```'
            })
        } else if (command == 'roles') {
            bot.sendMessage({
                to: channelID,
                message: 'Brandon: Healer\nSunny: DPS\nYulong: Tank\nCharlie: all me guy'
            })
        } else if (command == 'asl') {
            let [age, sex, location] = args;
            bot.sendMessage({
                to: userID,
                message: `Hello ${user}, I see you're a ${age} year old ${sex} from ${location}. Wanna skate?`
            })
        } else if (command == 'translate') {
            // syntax: command targetLang text
            var target = args[0]
            args.shift();
            var textToTranslate = helpers.toString(args, ' ', false);

            translate(textToTranslate, {to: languages.getCode(target)}).then(res => {
                bot.sendMessage({
                    to:channelID,
                    message: res.text
                })
                // console.log(res.text);
                //=> I speak English
                // console.log(res.from.language.iso);
                //=> nl
            }).catch(err => {
                console.error(err);
            });
        } else if (command == 'define') {
            var word = helpers.toString(args, ' ', false);
            service.define(word, 'en');
            bot.sendMessage({
                to:channelID,
                message: 'Define is currently broken and does not work'
            })
        }
     }
});
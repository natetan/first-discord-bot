var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var helpers = require('./helpers.js');

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
    const prefix = '!';

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
                message: '```JavaScript' + '\nconsole.log(' + helpers.toString(args, ' ', false) + ')```'
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
        }
     }
});
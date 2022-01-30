"use strict";

// An open-source Dank Memer calculator bot
// Made with the previous code of Cinnamon
// by OIRNOIR#0032 | https://github.com/OIRNOIR

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config');

const thisInstance = {
  client: new Discord.Client({
    partials: ['CHANNEL'],
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    presence: {
      status: instance.config.status,
      activities: [
        {
          name: instance.config.statusMessage,
          type: instance.config.statusType
        }
      ]
    }
  }),
  config,
  commands: new Discord.Collection(),
  functions: {}
};
for (const dir of fs.readdirSync(__dirname + "/commands").filter(d => !d.startsWith("."))){
  const commands = fs.readdirSync(__dirname + "/commands/" + String(dir)).filter(file => file.endsWith('.js'));
  for (const commandFile of commands){
    const command = require(`./commands/${dir}/${commandFile}`);
    thisInstance.commands.set(command.name.toLowerCase(), command);
  }
}

const events = fs.readdirSync(__dirname + '/events').filter(file => file.endsWith('js'));
for (const eventFile of events){
  const event = require(`${__dirname}/events/${eventFile}`);
  thisInstance.client.on(eventFile.split('.')[0], event.bind(null, thisInstance));
}

thisInstance.client.login(thisInstance.config.token);
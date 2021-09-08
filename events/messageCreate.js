"use strict";

const Discord = require('discord.js');

module.exports = async (instance, message) => {
  message.isDM = message.guild === undefined || message.guild === null;
  if (message.partial){await message.fetch()}
  if (message.channel.partial){await message.channel.fetch()}
  if (!message.isDM){
    if (message.channel.isThread()){
      if (!message.channel.sendable){
        return;
      }
    } else {
      if (!message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.SEND_MESSAGES) || !message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.VIEW_CHANNEL)){
        return;
      }
    }
  }
  if (message.author.bot){return;}
  if (message.content != undefined && message.content.toLowerCase().startsWith(instance.config.prefix.toLowerCase())){
    const args = message.content.slice(instance.config.prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();
    const command = instance.commands.get(commandName) || instance.commands.find(cmd => cmd.aliases.indexOf(commandName) > -1);
    if (command != undefined){
      if (command.guildOnly && message.isDM) return message.reply({content: "This command isn't available in DMs.", allowedMentions: {repliedUser: false}});
      if (command.acceptableTypes.indexOf("message") == -1) return message.channel.send({content: "This command can't be run via message!"});
      if (message.isDM == false){
        let missingPermissions = [];
        if (!message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.EMBED_LINKS) && command.requiredPermissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)){missingPermissions.push("Embed Links");}
        if (!message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY) && command.requiredPermissions.has(Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY)){missingPermissions.push("Read Message History");}
        if (missingPermissions.length > 0){
          return await message.channel.send("I am missing these permissions: " + missingPermissions.join(', ') + ". These are required to run this command. Use `" + settings.prefix + "checkperms` to check my perms in this channel.");
        }
      }
      await command.execute(instance, message, commandName, args);
    }
  } else if (message.content.startsWith("<@" + instance.client.user.id + ">") || message.content.startsWith("<@!" + instance.client.user.id + ">")){
    if (!message.isDM && (!message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.EMBED_LINKS) || !message.channel.permissionsFor(message.guild.me).has(Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY))){
      return await message.channel.send("I am missing either the Embed Links permission or the Read Message History permission, they are required to send the embed. My prefix is `" + instance.config.prefix + "`, use `" + instance.config.prefix + "help` for a list of commands when I get enough permissions.");
    }
    const pingEmbed = new Discord.MessageEmbed()
    .setTitle("Hey there!")
    .setAuthor(instance.client.user.username, instance.client.user.avatarURL())
    .setColor(instance.config.embedColor)
    .setDescription("My prefix is `" + instance.config.prefix + "`\nUse `" + instance.config.prefix + "help` for a list of commands.");
    await message.reply({embeds: [pingEmbed], allowedMentions: {repliedUser: false}});
  }
}
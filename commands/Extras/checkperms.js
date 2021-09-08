"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Checkperms",
  aliases: [],
  category: "Extras",
  description: "Check my perms in your channel. Do I have permission to do everything I need to do?",
  syntax: "",
  example: "",
  guildOnly: true,
  requiredPermissions: new Discord.Permissions(),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      let missingPermissions = [];
      if (!obj.channel.permissionsFor(obj.guild.me).has(Discord.Permissions.FLAGS.EMBED_LINKS)){missingPermissions.push("Embed Links");}
      if (!obj.channel.permissionsFor(obj.guild.me).has(Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY)){missingPermissions.push("Read Message History");}
      if (missingPermissions.length == 0){
        return await obj.reply({content: "I have all the perms it needs in this channel! All commands are available.", allowedMentions: {repliedUser: false}});
      } else {
        let text = "I am missing one or more permissions. This may limit what commands you can use.";
        const canReply = obj.channel.permissionsFor(obj.guild.me).has(Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY);
        if (missingPermissions.indexOf("Embed Links") != -1){
          text = text + "\nThe `Embed Links` permission is necessary to send message embeds. Most commands make heavy use of this permission. You should enable this permission to use most of my commands.";
        }
        if (missingPermissions.indexOf("Read Message History") != -1){
          text = text + "\nThe `Read Message History` permission is necessary to use inline replies. You should enable this permission to use most of my commands."
        }
        if (canReply){
          await obj.reply({content: text, allowedMentions: {repliedUser: false}});
        } else {
          await obj.channel.send(text);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
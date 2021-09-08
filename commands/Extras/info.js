"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Info",
  aliases: [],
  category: "Extras",
  description: "Get basic bot info, such as server count.",
  syntax: "",
  example: "",
  guildOnly: false,
  acceptableTypes: ["message"],
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS").add("READ_MESSAGE_HISTORY"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle("Bot Info and Statistics")
      .setColor(embedColor)
      .addFields([{
        name: "Server Count",
        value: String(client.guilds.cache.size),
        inline: true
      }, {
        name: "Current Prefix",
        value: instance.config.prefix,
        inline: true
      }, {
        name: "Made by",
        value: "OIRNOIR#0032",
        inline: true
      }, {
        name: "Packages",
        value: "-`discord.js` version 13.1.0",
        inline: true
      }]);
      await obj.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
    } catch (error) {
      console.log(error);
    }
  }
};
"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Ping",
  aliases: [],
  category: "Extras",
  description: "Get the bot's latency.",
  syntax: "",
  example: "",
  guildOnly: false,
  acceptableTypes: ["message"],
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      const pingTestEmbed = new Discord.MessageEmbed()
      .setAuthor("Pinging...", client.user.avatarURL())
      .setTitle("Pinging...")
      .setColor(embedColor)
      .setDescription("Getting bot latency...");
      const sent = await obj.channel.send({embeds: [pingTestEmbed]});
      const latency = sent.createdTimestamp - obj.createdTimestamp;
      const finalEmbed = new Discord.MessageEmbed()
      .setAuthor("Pong!", client.user.avatarURL())
      .setTitle("Total latency: " + String(latency) + "ms")
      .setColor(embedColor)
      .setDescription("Websocket ping: " + String(client.ws.ping) + "ms");
      await sent.edit({embeds: [finalEmbed]});
    } catch (error) {
      console.log(error);
    }
  }
};
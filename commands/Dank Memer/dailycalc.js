"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Dailycalc",
  aliases: ["dc"],
  category: "Dank Memer",
  description: "Calculate Dank Memer daily streaks.",
  syntax: " <Days> [Premium]",
  example: " 24 premium",
  guildOnly: false,
  acceptableTypes: ["message"],
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS").add("READ_MESSAGE_HISTORY"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      const input = args[0];
      if (input == undefined || isNaN(input)) {
        return await obj.reply({content: 'Invalid usage. Syntax: `' + instance.config.prefix + 'dailycalc <streak>`', allowedMentions: {repliedUser: false}});
      }
      if (Number(input) > 3000) {
        return await obj.reply({content: "That's such a long streak you have.", allowedMentions: {repliedUser: false}});
      }
      if (Number(input) < 0) {
        return await obj.reply({content: "That's such a short streak you have. Up your game and come back.", allowedMentions: {repliedUser: false}});
      }
      let coins = Math.round(25000+(Number(input)*250));
      let dont = " dont";
      if (args[1] != undefined && (args[1] == "premium" || args[1] == true)){
        coins = Math.round(25000+(Number(input)*350));
        dont = "";
      }
      let box = "";
      if (Number(input) != 0){
        if (Number(input)%100 == 0){
          box = "and a GOD BOX";
        } else if (Number(input)%30 == 0){
          box = "and a DANK BOX";
        } else if (Number(input)%7 == 0){
          box = "and a NORMIE BOX";
        }
      }
      const dailyEmbed = new Discord.MessageEmbed()
      .setAuthor('Dank Memer Daily Calculator', client.user.avatarURL())
      .setTitle(`⏣${String(coins)} ${box}`)
      .setDescription("This is assuming you" + dont + " have Dank Memer Premium.")
      .setColor(embedColor)
      .setFooter("For Dank Memer Patrons, add 'premium' to the end of your command to calculate premium amounts.");
      await obj.reply({embeds: [dailyEmbed], allowedMentions: {repliedUser: false}});
    } catch (error) {
      console.error(error)
    }
  }
};
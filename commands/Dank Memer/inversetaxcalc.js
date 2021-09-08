"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Inversetaxcalc",
  aliases: ["itaxcalc", "itc"],
  category: "Dank Memer",
  description: "Calculate how much money someone would receive after taxes if you gave that amount",
  syntax: " <Coins>",
  example: " 103093",
  guildOnly: false,
  acceptableTypes: ["message"],
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS").add("READ_MESSAGE_HISTORY"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      let input = String(args[0]);
      function getTaxPercent(num){
        // num is for back when the taxes had ranges
        return 3;
      }
      if (isNaN(input) || input < 0){
        return await obj.reply({content: 'Invalid coin amount!', allowedMentions: {repliedUser: false}});
      }
      if (input > Number.MAX_SAFE_INTEGER){
        return await obj.reply({content: "Sorry, amounts over the integer limit " + String(Number.MAX_SAFE_INTEGER) + " aren't supported.", allowedMentions: {repliedUser: false}});
      }
      if (Math.round(input) != input){
        return await obj.reply({content: "Since when has decimal amounts of coins been a thing in Dank Memer?", allowedMentions: {repliedUser: false}});
      }
      const percent = getTaxPercent(input);
      const paid = Math.round(input - (input * (percent / 100)));
      const taxed = input - paid;
      const msg = new Discord.MessageEmbed()
      .setTitle("⏣" + String(paid))
      .setColor(embedColor)
      .setAuthor("Dank Memer Inverse Tax Calculator", client.user.avatarURL())
      .setDescription("Amount inputted: ⏣" + String(input) + "\nTax paid: ⏣" + String(taxed));
      await obj.reply({embeds: [msg], allowedMentions: {repliedUser: false}});
    } catch (error) {
      console.error(error)
    }
  }
};
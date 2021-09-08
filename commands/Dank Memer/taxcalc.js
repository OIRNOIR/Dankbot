"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Taxcalc",
  aliases: ["tc"],
  category: "Dank Memer",
  description: "Calculate how much money you'll pay after Dank Memer taxes",
  syntax: " <Coins>",
  example: " 100000",
  guildOnly: false,
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
      let percent = getTaxPercent(input);
      let paid = Math.round(input / (1 - (percent / 100)));
      if (percent != getTaxPercent(paid)){
        percent = getTaxPercent(paid);
        paid = Math.round(input / (1 - (percent / 100)));
      }
      const taxed = paid - input;
      const msg = new Discord.MessageEmbed()
      .setTitle("⏣" + String(paid))
      .setColor(embedColor)
      .setAuthor("Dank Memer Tax Calculator", client.user.avatarURL())
      .setDescription("Amount inputted: ⏣" + String(input) + "\nTax paid: ⏣" + String(taxed))
      .setFooter("Dank Memer Patrons don't pay taxes.");
      await obj.reply({embeds: [msg], allowedMentions: {repliedUser: false}});
    } catch (error) {
      console.log(error);
    }
  }
};
"use strict";

const Discord = require('discord.js');

module.exports = {
  name: "Prestigecalc",
  aliases: ["prc"],
  category: "Dank Memer",
  description: "Get how much a prestige to a given level will cost in coins and levels. Add 'premium' to the end if you have dank memer premium.",
  syntax: " <prestige> [premium]` OR `{prefix}COMMANDNAME <prestige from> <prestige to> [premium]",
  example: " 10 premium",
  guildOnly: false,
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS").add("READ_MESSAGE_HISTORY"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      let from;
      let to;
      let premium = false;
      if (args[0] == undefined || isNaN(args[0])) {
        return await obj.reply({content: "Please provide a prestige level.", allowedMentions: {repliedUser: false}});
      }
      if (args[0] > 100) {
        return await obj.reply({content: "As far as I know, you can't prestige above 100.", allowedMentions: {repliedUser: false}});
      }
      if (args[1] == undefined) {
        to = Number(args[0]);
        from = to - 1;
      } else if (isNaN(args[1])){
        if (args[1] == "premium" || args[1] == true){
          premium = true;
        }
        to = Number(args[0]);
        from = to - 1;
      } else {
        from = Number(args[0]);
        to = Number(args[1]);
        if (args[2] != undefined && (args[2] == "premium" || args[2] == true)){
          premium = true;
        }
      }
      if (to < 1) {
        return await obj.reply({content: "You can't prestige to a level less than 1!", allowedMentions: {repliedUser: false}});
      }
      if (from < 0) {
        return await obj.reply({content: "You can't prestige from a negative level!", allowedMentions: {repliedUser: false}});
      }
      if (from > to) {
        return await obj.reply({content: "You can't prestige downwards. Try putting the level you're prestiging to after the one you're prestiging from.", allowedMentions: {repliedUser: false}});
      }
      if (from == to) {
        return await obj.reply({content: "Why are you using this calculator if you're trying to prestige to a level you already are?", allowedMentions: {repliedUser: false}});
      }
      const distance = to - from;
      let coinreq = 0;
      let levelreq = 0;
      for (let i = 1; i <= distance; i++) {
        const minito = from + i;
        if (premium){
          coinreq = coinreq + minito * 200000;
          levelreq = levelreq + minito * 10;
        } else {
          coinreq = coinreq + minito * 300000;
          levelreq = levelreq + minito * 20;
        }
      }
      let dont = " dont";
      if (premium){
        dont = "";
      }
      const msg = new Discord.MessageEmbed()
      .setTitle('Dank Memer Prestige Calculator')
      .setColor(embedColor)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Assuming you" + dont + " have dank memer premium, prestiging from prestige " + String(from) + " to prestige " + String(to) + "\nWould cost ⏣" + String(coinreq) + " and " + String(levelreq) + " levels.");
      await obj.reply({embeds: [msg], allowedMentions: {repliedUser: false}});
    } catch (error) {
      console.log(error);
    }
  }
};
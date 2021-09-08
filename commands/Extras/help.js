"use strict";

const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: "Help",
  aliases: ["h"],
  category: "Extras",
  description: "View a list of commands, or get information on individual commands.",
  syntax: " [Command]",
  example: "",
  guildOnly: false,
  acceptableTypes: ["message"],
  requiredPermissions: new Discord.Permissions().add("EMBED_LINKS").add("READ_MESSAGE_HISTORY"),

  async execute(instance, obj, commandName, args) {
    const client = instance.client;
    const embedColor = instance.config.embedColor;
    try {
      const requested = args[0];
      const categoryNames = fs.readdirSync(__dirname + "/..").filter(d => !d.startsWith(".") && ["Dev"].indexOf(d) == -1);
      let categories = [];
      for (const cat of categoryNames){
        categories.push({
          name: cat,
          commands: []
        });
      }
      for (const command of Array.from(instance.commands.values())){
        categories.find(cat => cat.name == command.category).commands.push(command);
      }
      if (requested == undefined || requested == "" || requested.trim() == undefined || requested.trim() == ""){
        let fields = [];
        for (const category of categories){
          let cs = [];
          for (const c of category.commands){
            cs.push(c.name);
          }
          fields.push("**" + category.name + ":** `" + cs.join("`\xa0\xa0`").toLowerCase() + "`");
        }
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Commands")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor(embedColor)
        .setDescription(fields.join("\n"))
        .setFooter("To learn more about a specific command, use " + instance.config.prefix + "help <command>.");
        await obj.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
      } else {
        const command = instance.commands.get(requested.trim().toLowerCase()) || instance.commands.find(cmd => cmd.aliases.indexOf(requested.trim().toLowerCase()) > -1);
        if (command == undefined){
          await obj.reply({content: "No such command exists!", allowedMentions: {repliedUser: false}});
        }
        let theseAliases = command.aliases.join(", ");
        if (command.aliases.length == 0){
          theseAliases = "No aliases!";
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(command.name + " Command Help")
        .setDescription(command.description.replace("{prefix}", instance.config.prefix))
        .setColor(embedColor)
        .setAuthor(client.user.username, client.user.avatarURL())
        .addFields([{
          name: "Syntax",
          value: "`" + instance.config.prefix + requested.trim().toLowerCase() + command.syntax.replace("COMMANDNAME", requested.trim().toLowerCase()).replace("{prefix}", instance.config.prefix) + "`"
        }, {
          name: "Example",
          value: "`" + instance.config.prefix + requested.trim().toLowerCase() + command.example.replace("COMMANDNAME", requested.trim().toLowerCase()).replace("{prefix}", instance.config.prefix) + "`"
        }, {
          name: "Aliases",
          value: theseAliases
        }]);
        await obj.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
      }
    } catch (error) {
      console.log(error);
    }
  }
};
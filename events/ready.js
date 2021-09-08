"use strict";

module.exports = async (instance) => {
  instance.clientValid = true;
  instance.client.sweepMessages(300);
  instance.client.user.setPresence({status: instance.config.status, activities: [{name: instance.config.statusMessage.replace("{SERVERCOUNT}", instance.client.guilds.cache.size), type: instance.config.statusType}]});
  console.log("Logged in as " + instance.client.user.tag);
  const interval = setInterval(() => {
    if (instance.clientValid == false) return clearInterval(interval);
    instance.client.sweepMessages(300);
    instance.client.user.setPresence({status: instance.config.status, activities: [{name: instance.config.statusMessage.replace("{SERVERCOUNT}", instance.client.guilds.cache.size), type: instance.config.statusType}]});
  }, 300000);
  interval.unref();
}
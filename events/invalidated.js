"use strict";

module.exports = (instance) => {
  if (instance.validClients.indexOf(instance.client.user.id) != -1){
    instance.validClients.splice(instance.validClients.indexOf(instance.client.user.id), 1);
  }
}
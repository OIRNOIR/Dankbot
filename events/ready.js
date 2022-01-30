"use strict";

module.exports = async (instance) => {
  console.log("Logged in as " + instance.client.user.tag);
}
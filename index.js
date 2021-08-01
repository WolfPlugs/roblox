// Search someone roblox user with powercord

//powercord imports
const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

// Extend the Plugin class
module.exports = class Roblox extends Plugin {
  // Initialize the plugin
  startPlugin() {
    // Register the command
    powercord.api.commands.registerCommand({
      name: "roblox",
      description: "Search for a roblox user",
      usage: "<username>",
      permission: "",
      execute: (args, channel, user) => {
        // try catch
        try {
          // Get the user
          get(
            `https://api.roblox.com/users/get-by-username?username=${args.username}`
          )
            .then(
              (data) => {
                  console.log(data);
                // Check if the user exists
                if (data.Data.Id != null) {
                  // Send the user
                  return {
                    username: data.Data.Username,
                    avatar_url: `https://roblox.com/Thumbs/BCOverlay.ashx?username=${data.Data.Username}`,
                    result: {
                      type: "rich",
                      fields: [
                        {
                            name: "STATS",
                            value: [
                                `Username: ${data.Data.Username}`
                            ].join('\n'),
                            inline: true
                        },
                    ]
                    },
                  };
                } else {
                  // Send the user
                  return {
                    username: "Roblox",
                    avatar_url: "https://i.imgur.com/uRpvasp.png",
                    result: "No user Found",
                  };
                }
              }
              // If the user doesn't exist
            )
            .catch((err) => {
              // Send the user
              channel.send("User not found");
            });
        } catch (err) {
          // Send the user
          channel.send("Error");
        }
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("roblox");
  }
};

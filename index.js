const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

// Extend the Plugin class
module.exports = class Roblox extends Plugin {
  // Initialize the plugin
  startPlugin() {
    // Register the command
    powercord.api.commands.registerCommand({
      command: "roblox",
      description: "Search for a roblox user",
      usage: "{c} <username>",
      execute: async (args, channel) => {
        // try catch
        try {
          // Get the user
          const { body } = await get(
            `https://api.roblox.com/users/get-by-username?username=${args.username}`
          );
          
          // Check if the user exists
          if (body.Data.Id != null) {

            const data = await get(
              `https://api.roblox.com/ownership/hasasset?userId=${body.Data.id}&assetId=102611803`
            );
            const Verifiedcheck = data.body

            // Send the user
            return {
              username: body.Data.Username,
              avatar_url: `https://roblox.com/Thumbs/BCOverlay.ashx?username=${body.Data.Username}`,
              result: {
                type: "rich",
                fields: [
                  {
                    name: "STATS",
                    value: [
                      `Username: ${body.Data.Username}`,
                      `ID: ${body.Data.Id}`,
                      `Verified: ${Verifiedcheck ? 'Yes' : 'NOPE'}`,
                      `[Profile Link](https://web.roblox.com/users/${body.Data.Id}/profile "Nothing SUS")`
                    ].join("\n"),
                    inline: true,
                  },
                ],
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

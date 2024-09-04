import { config } from 'dotenv';
import fs from 'node:fs';

// Load environment variables from .env file
config(); 

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Function to load commands
async function loadCommands() {
  for (const file of commandFiles) {
    try {
      // Dynamically import the command file
      const command = await import(`./commands/${file}`);
      // Check if the command file has the required properties
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
      }
    } catch (error) {
      console.error(`[ERROR] Failed to load command ${file}:`, error);
    }
  }
}

// Dynamically import REST and Routes based on Discord.js version
async function getRESTAndRoutes() {
  try {
    const { REST, Routes } = await import('discord.js');
    return { REST, Routes };
  } catch {
    const { REST } = await import('@discordjs/rest');
    const { Routes } = await import('discord-api-types/v9');
    return { REST, Routes };
  }
}

// Deploy your commands
(async () => {
  try {
    await loadCommands(); // Load commands before deploying

    const { REST, Routes } = await getRESTAndRoutes();

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.TOKEN);

    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVERID),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // Log any errors during deployment
    console.error('Failed to deploy commands:', error);
  }
})();
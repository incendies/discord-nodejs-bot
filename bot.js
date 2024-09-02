// Suppress punycode deprecation warning
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) {
    return; // Skip punycode deprecation warnings
  }
  console.warn(warning.name, warning.message, warning.stack);
});

import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';

import * as talktalk from './commands/talktalk.js';
import * as weather from './commands/weather.js';
import * as play from './commands/play.js'; 

config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
});

// Create a new instance of the player
const player = new Player(client);

async function readyDiscord() {
  console.log('Talk Talk is online!', client.user.tag);
  
  // Initialize discord-player with YoutubeiExtractor
  await player.extractors.register(YoutubeiExtractor, {});
}

// Handle interactions
async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  try {
    if (interaction.commandName === 'talktalk') {
      await talktalk.execute(interaction);
    } else if (interaction.commandName === 'ping') {
      const pingCommand = await import('./commands/ping.js');
      await pingCommand.execute(interaction);
    } else if (interaction.commandName === 'weather') {
      await weather.execute(interaction);
    } else if (interaction.commandName === 'play') {
      await play.execute(interaction, player);
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}

// Set up event listeners
client.once(Events.ClientReady, readyDiscord);
client.on(Events.InteractionCreate, handleInteraction);

// Log in to Discord
client.login(process.env.TOKEN);

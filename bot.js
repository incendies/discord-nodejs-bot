import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as talktalk from './commands/talktalk.js';
import * as weather from './commands/weather.js';
import * as play from './commands/play.js';
import * as stop from './commands/stop.js';
import * as ping from './commands/ping.js'; 
import * as imgur from './commands/imgur.js';  // Import imgur command
import * as joke from './commands/joke.js';  // Import joke command
import * as trivia from './commands/trivia.js';  // Import trivia command

config(); // Load environment variables from .env file

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});
const player = new Player(client);

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

async function registerCommands() {
  try {
    const commands = [
      talktalk.data.toJSON(),
      play.data.toJSON(),
      stop.data.toJSON(),
      weather.data.toJSON(),
      imgur.data.toJSON(),  // Register the imgur command
      ping.data.toJSON(),
      joke.data.toJSON(),
      trivia.data.toJSON(),
    ];

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    console.log(`Registering commands for application ID: ${CLIENT_ID}`);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log('Commands registered successfully.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

async function readyDiscord() {
  console.log('Talk Talk is online!', client.user.tag);

  await player.extractors.register(YoutubeiExtractor, {});
  await registerCommands();
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  try {
    if (interaction.commandName === 'talktalk') {
      await talktalk.execute(interaction);
    } else if (interaction.commandName === 'ping') {
      await ping.execute(interaction);
    } else if (interaction.commandName === 'weather') {
      await weather.execute(interaction);
    } else if (interaction.commandName === 'play') {
      await play.execute(interaction, player);
    } else if (interaction.commandName === 'stop') {
      await stop.execute(interaction);
    } else if (interaction.commandName === 'imgur') {
      await imgur.execute(interaction);  // Corrected this line
    } else if (interaction.commandName === 'joke') {
      await joke.execute(interaction);
    } else if (interaction.commandName === 'trivia') {
      await trivia.execute(interaction);
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}

client.once(Events.ClientReady, readyDiscord);
client.on(Events.InteractionCreate, handleInteraction);
client.login(TOKEN);

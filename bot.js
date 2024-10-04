import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import * as talktalk from './commands/talktalk.js';
import * as weather from './commands/weather.js';
import * as play from './commands/play.js';
import * as stop from './commands/stop.js';
import * as ping from './commands/ping.js'; 
import * as imgur from './commands/imgur.js';  
import * as joke from './commands/joke.js';  
import * as trivia from './commands/trivia.js';  
import * as quote from './commands/quote.js';  
import * as news from './commands/news.js';  
import * as remindme from './commands/remindme.js';  
import * as math from './commands/math.js';  
import * as userstats from './commands/userstats.js'; 
import * as currency from './commands/currency.js'; 
import * as help from './commands/help.js';
import * as serverinfo from './commands/serverinfo.js';

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

const commands = new Map();

// Load all command files from the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Dynamically import each command and store it in the commands map
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.set(command.data.name, command);
}

async function registerCommands() {
  try {
    const commands = [
      talktalk.data.toJSON(),
      play.data.toJSON(),
      stop.data.toJSON(),
      weather.data.toJSON(),
      imgur.data.toJSON(),
      ping.data.toJSON(),
      joke.data.toJSON(),
      trivia.data.toJSON(),
      quote.data.toJSON(),
      news.data.toJSON(),
      remindme.data.toJSON(),
      math.data.toJSON(),
      userstats.data.toJSON(),
      currency.data.toJSON(), 
      help.data.toJSON(),
      serverinfo.data.toJSON()
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
    const userId = interaction.user.id;

    // Track the command usage for the user
    userstats.incrementUserCommandCount(userId); // Increment user command count

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
      await imgur.execute(interaction);
    } else if (interaction.commandName === 'joke') {
      await joke.execute(interaction);
    } else if (interaction.commandName === 'trivia') {
      await trivia.execute(interaction);
    } else if (interaction.commandName === 'quote') {
      await quote.execute(interaction);
    } else if (interaction.commandName === 'news') {
      await news.execute(interaction);
    } else if (interaction.commandName === 'remindme') {
      await remindme.execute(interaction);
    } else if (interaction.commandName === 'math') {
      await math.execute(interaction);
    } else if (interaction.commandName === 'userstats') {
      await userstats.execute(interaction); 
    } else if (interaction.commandName === 'currency') {
      await currency.execute(interaction);
    } else if (interaction.commandName === 'help') {
      await help.execute(interaction);
    } else if (interaction.commandName === 'serverinfo') {
      await serverinfo.execute(interaction);
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}

client.once(Events.ClientReady, readyDiscord);
client.on(Events.InteractionCreate, handleInteraction);
client.login(TOKEN);

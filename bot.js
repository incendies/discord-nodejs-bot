import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

import * as talktalk from './commands/talktalk.js';
import * as weather from './commands/weather.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

function readyDiscord() {
  console.log('Talk Talk is online!', client.user.tag);
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'talktalk') {
    await talktalk.execute(interaction);
  } else if (interaction.commandName === 'ping') {
    const pingCommand = await import('./commands/ping.js');
    await pingCommand.execute(interaction);
  } else if (interaction.commandName === 'weather') {
    await weather.execute(interaction);
  }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);

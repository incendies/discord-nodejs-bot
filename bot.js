import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

import * as choochoo from './commands/talktalk.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

function readyDiscord() {
  console.log('Talk Talk!', client.user.tag);
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'talktalk') {
    await choochoo.execute(interaction);
  }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);

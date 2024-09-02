// commands/ping.js

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check if the bot is online');

export async function execute(interaction) {
  await interaction.reply('TalkTalk bot is online and ready to serve!');
}



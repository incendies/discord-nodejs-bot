// commands/remindme.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('remindme')
  .setDescription('Set a reminder after a specific time.')
  .addStringOption(option => 
    option.setName('message')
      .setDescription('What do you want to be reminded of?')
      .setRequired(true))
  .addIntegerOption(option =>
    option.setName('time')
      .setDescription('Time in seconds until the reminder.')
      .setRequired(true));

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  const time = interaction.options.getInteger('time');

  if (time <= 0) {
    return interaction.reply('Please provide a positive time in seconds.');
  }

  await interaction.reply(`I will remind you about: "${message}" in ${time} seconds.`);

  setTimeout(() => {
    interaction.followUp(`⏰ Reminder: ${message}`);
  }, time * 1000); // Convert seconds to milliseconds
}

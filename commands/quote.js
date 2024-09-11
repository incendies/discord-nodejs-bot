// commands/quote.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

export const data = new SlashCommandBuilder()
  .setName('quote')
  .setDescription('Fetch a random inspirational or famous quote.');

export async function execute(interaction) {
  await interaction.deferReply(); // Acknowledge the command

  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    if (!data || data.length === 0) {
      return interaction.followUp('No quote found.');
    }

    const quote = data[0].q;
    const author = data[0].a;

    return interaction.followUp(`*"${quote}"* - **${author}**`);
  } catch (error) {
    console.error('Error fetching the quote:', error);
    return interaction.followUp('There was an error fetching the quote. Please try again later.');
  }
}

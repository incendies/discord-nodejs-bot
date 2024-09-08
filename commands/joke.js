// commands/joke.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Get a random joke');

export async function execute(interaction) {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();

    await interaction.reply(`${joke.setup}\n\n${joke.punchline}`);
  } catch (error) {
    console.error('Error fetching joke:', error);
    await interaction.reply('Oops! Something went wrong while fetching the joke.');
  }
}

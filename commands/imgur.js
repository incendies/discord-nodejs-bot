// commands/imgur.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('imgur')
  .setDescription('Search for an image on Imgur.')
  .addStringOption(option =>
    option.setName('query')
      .setDescription('The search query')
      .setRequired(true));

export async function execute(interaction) {
  const query = interaction.options.getString('query');
  
  await interaction.deferReply(); // Acknowledge the command

  try {
    const response = await fetch(`https://api.imgur.com/3/gallery/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });

    const data = await response.json();
    const images = data.data;

    if (images.length === 0) {
      return interaction.followUp('No results found for your search query.');
    }

    const image = images[0]; // Just grab the first image for simplicity

    return interaction.followUp({
      content: `**${image.title || 'Image'}**\n${image.link}`,
    });

  } catch (error) {
    console.error('Error fetching Imgur data:', error);
    return interaction.followUp('There was an error fetching the images. Please try again later.');
  }
}

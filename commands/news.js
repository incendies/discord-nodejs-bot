// commands/news.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('news')
  .setDescription('Fetch the latest game news headlines.');

export async function execute(interaction) {
  await interaction.deferReply(); // Acknowledge the command

  try {
    // Fetch game-related news
    const response = await fetch(`https://newsapi.org/v2/everything?q=gaming&apiKey=${process.env.NEWS_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();
    const articles = data.articles;

    if (articles.length === 0) {
      return interaction.followUp('No game news articles found.');
    }

    // Construct a message with top 3 news headlines
    const newsMessage = articles.slice(0, 3).map((article, index) => {
      return `**${index + 1}. ${article.title}**\n${article.description || 'No description available.'}\n${article.url}`;
    }).join('\n\n');

    return interaction.followUp(newsMessage);

  } catch (error) {
    console.error('Error fetching news:', error);
    return interaction.followUp('There was an error fetching the game news. Please try again later.');
  }
}

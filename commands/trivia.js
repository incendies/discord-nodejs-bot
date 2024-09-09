import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';
import { decode } from 'html-entities'; // Import the decode function

export const data = new SlashCommandBuilder()
  .setName('trivia')
  .setDescription('Answer a random trivia question.');

export async function execute(interaction) {
  await interaction.deferReply();

  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const data = await response.json();
    const trivia = data.results[0];

    const question = decode(trivia.question); // Decode HTML entities in the question
    const correctAnswer = decode(trivia.correct_answer); // Decode correct answer
    const answers = [...trivia.incorrect_answers.map(decode), correctAnswer].sort(() => Math.random() - 0.5); // Decode answers and shuffle

    let options = '';
    answers.forEach((answer, index) => {
      options += `\n${index + 1}. ${answer}`;
    });

    await interaction.followUp(`**Trivia Question:** ${question}\n${options}`);

  } catch (error) {
    console.error('Error fetching trivia question:', error);
    return interaction.followUp('There was an error fetching the trivia question. Please try again.');
  }
}

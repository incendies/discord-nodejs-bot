import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';

const userStatsPath = path.join(process.cwd(), './data/userStats.json');

// Load user statistics from the JSON file
function loadUserStats() {
  if (!fs.existsSync(userStatsPath)) {
    fs.writeFileSync(userStatsPath, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(userStatsPath));
}

// Save user statistics to the JSON file
function saveUserStats(stats) {
  fs.writeFileSync(userStatsPath, JSON.stringify(stats, null, 2));
}

// Increment the command count for a user
export function incrementUserCommandCount(userId) {
  const stats = loadUserStats();
  if (!stats[userId]) {
    stats[userId] = { commandCount: 0 };
  }
  stats[userId].commandCount += 1;
  saveUserStats(stats);
}

// Create command data
export const data = new SlashCommandBuilder()
  .setName('userstats')
  .setDescription('Get your command usage statistics.');

export async function execute(interaction) {
  const userId = interaction.user.id;
  const stats = loadUserStats();
  const commandCount = stats[userId] ? stats[userId].commandCount : 0;

  await interaction.reply(`${interaction.user.username}, you have used ${commandCount} commands!`);
}

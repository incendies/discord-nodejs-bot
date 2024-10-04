import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Provides information about the server.');

export async function execute(interaction) {
  const { guild } = interaction;

  await interaction.reply({
    content: `Server Name: **${guild.name}**\nTotal Members: **${guild.memberCount}**\nCreated At: **${guild.createdAt.toDateString()}**`,
    ephemeral: true // You can remove this if you want everyone to see the response
  });
}

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play a song from YouTube in a voice channel.')
  .addStringOption(option => 
    option.setName('song')
    .setDescription('The YouTube link or query for the song you want to play')
    .setRequired(true));

export async function execute(interaction, player) {
  const song = interaction.options.getString('song');
  
  const voiceChannel = interaction.member.voice.channel;
  if (!voiceChannel) {
    return interaction.reply('You need to join a voice channel first!');
  }

  await interaction.deferReply();

  try {
    const { track } = await player.play(voiceChannel, song, {
      nodeOptions: {
        metadata: interaction
      }
    });

    return interaction.followUp(`🎶 Now playing: **${track.title}**`);
  } catch (error) {
    console.error('Error executing play command:', error);
    return interaction.followUp('There was an error trying to play the song. Please try again.');
  }
}
import { SlashCommandBuilder } from '@discordjs/builders';
import { getVoiceConnection } from '@discordjs/voice';

export const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and leaves the voice channel.');

export async function execute(interaction) {
    // Check if the user is in a voice channel
    if (!interaction.member.voice.channel) {
        return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
    }

    // Get the voice connection for this guild
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
        return interaction.reply({ content: 'I am not playing any music!', ephemeral: true });
    }

    // Check if the bot is in the same voice channel as the user
    if (interaction.member.voice.channel.id !== connection.joinConfig.channelId) {
        return interaction.reply({ content: 'You need to be in the same voice channel as me to use this command!', ephemeral: true });
    }

    try {
        // Stop the audio player (if it exists)
        const player = connection.state.subscription?.player;
        if (player) {
            player.stop();
            await interaction.reply('Stopped the music.');
        } else {
            await interaction.reply('No audio player found.');
        }

        // Destroy the voice connection
        connection.destroy();
        await interaction.followUp('Left the voice channel.');
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}

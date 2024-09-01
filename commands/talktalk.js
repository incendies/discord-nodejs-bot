import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('talktalk')
    .setDescription('Talk to people in the server'); 

export async function execute(interaction) {
        await interaction.reply('Hello, how are you doing today? How can I help you?');
    }

    
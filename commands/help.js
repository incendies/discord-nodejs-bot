import { SlashCommandBuilder } from '@discordjs/builders';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a list of all available commands');

export async function execute(interaction) {
  // Read all the command files from the commands folder
  const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

  let commandList = '';
  for (const file of commandFiles) {
    const commandModule = await import(`./${file}`);
    const command = commandModule.data;
    // Add the command's name and description to the list
    if (command && command.name && command.description) {
      commandList += `**/${command.name}** - ${command.description}\n`;
    }
  }

  if (commandList === '') {
    commandList = 'No commands available.';
  }

  // Send the command list in the interaction reply
  await interaction.reply({
    content: `**Here are all the available commands:**\n\n${commandList}`,
    ephemeral: true, // Set ephemeral to true to make it visible only to the user who requested it
  });
}

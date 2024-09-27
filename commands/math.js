import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('math')
  .setDescription('Perform a basic math operation')
  .addNumberOption(option =>
    option.setName('num1')
      .setDescription('The first number')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('operation')
      .setDescription('The operation to perform: add, subtract, multiply, divide')
      .setRequired(true)
      .addChoices(
        { name: 'Add', value: 'add' },
        { name: 'Subtract', value: 'subtract' },
        { name: 'Multiply', value: 'multiply' },
        { name: 'Divide', value: 'divide' },
      ))
  .addNumberOption(option =>
    option.setName('num2')
      .setDescription('The second number')
      .setRequired(true));

export async function execute(interaction) {
  const num1 = interaction.options.getNumber('num1');
  const num2 = interaction.options.getNumber('num2');
  const operation = interaction.options.getString('operation');

  let result;

  // Perform the selected operation
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return interaction.reply('Error: Cannot divide by zero.');
      }
      result = num1 / num2;
      break;
    default:
      return interaction.reply('Invalid operation. Please choose add, subtract, multiply, or divide.');
  }

  // Respond with the result
  return interaction.reply(`The result of ${num1} ${operation} ${num2} is **${result}**.`);
}

import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('currency')
  .setDescription('Convert between two currencies')
  .addStringOption(option =>
    option.setName('from')
      .setDescription('The currency you want to convert from (e.g., USD)')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('to')
      .setDescription('The currency you want to convert to (e.g., EUR)')
      .setRequired(true))
  .addNumberOption(option =>
    option.setName('amount')
      .setDescription('Amount of currency to convert')
      .setRequired(true));

export async function execute(interaction) {
  const fromCurrency = interaction.options.getString('from').toUpperCase();
  const toCurrency = interaction.options.getString('to').toUpperCase();
  const amount = interaction.options.getNumber('amount');

  try {
    const apiKey = process.env.OPEN_EXCHANGE_API_KEY;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const fromRate = data.rates[fromCurrency];
      const toRate = data.rates[toCurrency];

      if (!fromRate || !toRate) {
        await interaction.reply(`Invalid currency codes provided.`);
        return;
      }

      const convertedAmount = (amount / fromRate) * toRate;
      await interaction.reply(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}.`);
    } else {
      console.error('Error fetching currency conversion data:', data);
      await interaction.reply(`Error: Unable to fetch conversion rates. Reason: ${data.error}`);
    }
  } catch (error) {
    console.error('Error fetching currency conversion data:', error);
    await interaction.reply('Sorry, there was an error converting the currency. Please try again later.');
  }
}

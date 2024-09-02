// commands/weather.js

import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export const data = new SlashCommandBuilder()
  .setName('weather')
  .setDescription('Get the current weather for a specified city')
  .addStringOption(option =>
    option.setName('city')
      .setDescription('The city to get the weather for')
      .setRequired(true));

export async function execute(interaction) {
  const cityName = interaction.options.getString('city');

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    
    console.log(response.data);  // Log the response to the console for debugging

    const weather = response.data;
    const weatherInfo = `Weather in ${weather.name}, ${weather.sys.country}:
- **Temperature:** ${weather.main.temp}°C
- **Weather:** ${weather.weather[0].description}
- **Humidity:** ${weather.main.humidity}%
- **Wind Speed:** ${weather.wind.speed} m/s`;

    await interaction.reply(weatherInfo);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message); // Log detailed error response
    await interaction.reply(`Could not retrieve weather data for "${cityName}". Please make sure the city name is correct.`);
  }
}
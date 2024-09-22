# TalkTalk - Discord Bot

Welcome to **TalkTalk**, a feature-rich Discord bot built with Node.js! TalkTalk is designed to enhance your Discord server with a variety of useful commands and functionalities. This README will guide you through the setup, configuration, and usage of the TalkTalk bot.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Moderation**: Kick, ban, mute, and manage server roles.
- **Fun**: Games, trivia, and random facts.
- **Utilities**: Server stats, weather updates, and more.
- **Custom Commands**: Easily add your own commands and responses.
- **Music**: Play music from YouTube and manage playlists.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Discord bot token (create one through the [Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/incendies/discord-nodejs-bot.git

2. **Clone the repository:**
    Navigate to the project directory:
    ```bash
    cd [pathname]

2. **Install dependencies:**
    ```bash
    npm install 

## Configuration

1 - Create a .env file in the root directory of the project.

2 - Add your Discord bot token and other configurations to the .env file:

    ```bash
    DISCORD_TOKEN=your-discord-bot-token
    PREFIX=!

Replace your-discord-bot-token with your actual Discord bot token.
The PREFIX is the command prefix that users will use to interact with the bot.

Go to the Discord Developer Portal.
Select your application and navigate to the "OAuth2" section.
Generate an OAuth2 URL with the "bot" scope and the necessary permissions.
Visit the generated URL to add the bot to your server.

1. **Start the bot:**

   ```bash
   npm start

Interact with the bot in your Discord server using the defined command prefix.

## Commands

Here are some example commands you can use with TalkTalk:

 * /ping - Check if the bot is online.
 * /weather <city> - Get the current weather for a specified city.
 * /play - <song> - Add your YouTube URL and play a song from YouTube in a voice channel. 
 * /stop - <song> - this command will stop the playing music but ensure your bot can connect to the voice channel and has permissions to stop the music
 * /imgur [query] - Search for an image on Imgur.com and return the best result. [You have to add your Imgur API to inside of the .env file]
 * /joke - The joke command retrieves a random joke to lighten the mood in your server.
 * /quote - this command will retrieve a random quote, providing a bit of inspiration or wisdom. The quote is sourced from an external API (ZenQuotes), and will include both the quote itself and the name of the author. If the API request fails, an error message will be shown.
 * /news - this command fetches and displays the latest gaming news using the [NewsAPI](https://newsapi.org/) service. Users can request the top headlines from the gaming category, and the bot will respond with the latest articles and their links.


## License

This project is licensed under the MIT License. See the LICENSE file for more details.


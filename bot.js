const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//checking if all run
client.once('ready', () => {
  console.log('Ready!');
});
//the commands for the server

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'coo') {

    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('myModal')
      .setTitle('My Modal');

    // Add components to modal

    // Create the text input components
    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('favoriteColorInput')
      // The label is the prompt the user sees for this input
      .setLabel("What's your favorite color?")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
      .setCustomId('hobbiesInput')
      .setLabel("What's some of your favorite hobbies?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  }
});

client.login(token);

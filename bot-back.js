const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//checking if all run
client.once('ready', () => {
  console.log('Ready!');
});
//the commands for the server

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'coo') {



    await interaction.reply('Coo!');
    await wait(2000);
    await interaction.editReply('Nice shell!');

  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.login(token);

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('report').setDescription('lets you report players that arent that squishee'),
  new SlashCommandBuilder().setName('cookie').setDescription('gives you a cookie'),
  new SlashCommandBuilder().setName('gameid').setDescription('let us know who you are in game!'),

]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  .catch(console.error);

const { Client, GatewayIntentBits } = require('discord.js');
const { InteractionType } = require('discord.js');

const { token } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const { ActivityType } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });


//checking if all run
client.once('ready', () => {

  client.user.setActivity('Alaric Cookies Stash', { type: ActivityType.Watching });


  console.log('Ready!');
});
//the commands for the server



client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // if (interaction.member.roles.cache.has('1012888938056261662')) { return; }

  if (interaction.commandName === 'report') {

    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('myModal')
      .setTitle('SquisheePokey');

    // Add components to modal

    // Create the text input components
    const userToReport = new TextInputBuilder()
      .setCustomId('Report')
      // The label is the prompt the user sees for this input
      .setLabel("Ingame name or user")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

    const reasonToReport = new TextInputBuilder()
      .setCustomId('Reason')
      .setLabel("What's the reason you wanna report them?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(userToReport);
    const secondActionRow = new ActionRowBuilder().addComponents(reasonToReport);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

  }




  if (interaction.commandName === 'gameid') {

    if (interaction.channel.id === '1012887699629277254') {



      // Create the modal
      const idmodal = new ModalBuilder()
        .setCustomId('idModal')
        .setTitle('SquisheePokey');

      // Add components to modal

      // Create the text input components
      const userId = new TextInputBuilder()
        .setCustomId('UserId')
        // The label is the prompt the user sees for this input
        .setLabel("what's your in game id? example: Sverra.8026")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(userId);

      // Add inputs to the modal
      idmodal.addComponents(firstActionRow);

      // Show the modal to the user
      await interaction.showModal(idmodal);

      //end of modal



    } else return;
    // await interaction.reply({ content: 'Your cant send that command here', ephemeral: true });



  }

  if (interaction.commandName === 'cookie') {

    const raccnom = client.emojis.cache.find(emoji => emoji.name === "cookienom03");

    await interaction.reply('cookie coming in 3...');
    await wait(2000);
    await interaction.editReply('2...');
    await wait(2000);
    await interaction.editReply('1...');
    await wait(2000);
    await interaction.editReply(':cookie:');
    await wait(2000);
    await interaction.editReply(`${raccnom}`);

  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;

  if (interaction.customId === 'myModal') {
    //getting user
    const userID = interaction.user.id;

    // Get the data entered by the user
    const User_to_report = interaction.fields.getTextInputValue('Report');
    const Reason_of_report = interaction.fields.getTextInputValue('Reason');
    //	console.log({ User_to_report, Reason_of_report });

    //building message

    //leaving this here in case we wanna make it 100% annonymous, even for us
    // const reported_user = `User: ${User_to_report}`;

    //with name
    const reported_user = `<@${userID}> has reported ${User_to_report}`;

    const report_reason = `Reason: ${Reason_of_report}`;


    //sneakies 1018223694922907808
    //squishee 1018673990786613358
    const channel = client.channels.cache.get('1018673990786613358');
    channel.send(reported_user);
    channel.send(report_reason);

    await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
  }

  if (interaction.customId === 'idModal') {
    //getting user
    const userID = interaction.user.id;

    // Get the data entered by the user
    const User_id = interaction.fields.getTextInputValue('UserId');

    //with name
    const in_game_id = `<@${userID}> is ${User_id} in game`;


    //sneakies 1018223694922907808
    //squishee 1018673990786613358
    //squishee roster 1012897955176521778
    const channel = client.channels.cache.get('1012897955176521778');
    channel.send(in_game_id);

    //guest role 994276021304045648
    if (interaction.member.roles.cache.has('994276021304045648')) {


      await interaction.member.roles.remove('1012888938056261662');//remove new role
      await interaction.member.roles.remove('994276021304045648');//remove guest role
      await interaction.member.roles.add('547517018140704785');//add recruit role
    }

    //end
    await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
  }

});

client.login(token);

import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(`This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
  },
};
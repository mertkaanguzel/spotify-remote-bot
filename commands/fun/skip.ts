import { useQueue } from 'discord-player';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current track and automatically plays the next'),
  async execute(interaction: ChatInputCommandInteraction) {
    const queue = useQueue(interaction.guildId!);

    if (!queue) {
      return interaction.reply({ content: `${interaction.client.dev.error} | You are **not** connected to a voice channel!`, ephemeral: true });
    }

    if (!queue.currentTrack) {
      return interaction.reply({ content: `${interaction.client.dev.error} | There is no track **currently** playing`, ephemeral: true });
    }

    queue.node.skip();

    return interaction.reply({
      content: '⏩ | **Skipped** to the next track',
    });
			
  },
};
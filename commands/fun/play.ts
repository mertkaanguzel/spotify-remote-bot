import { useMainPlayer } from 'discord-player';
import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { YouTubeExtractor } from '@discord-player/extractor';
import DiscordClient from '../../client';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a single song from Youtube')
    .addStringOption(option => option.setName('url').setDescription('the song\'s url').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const client = interaction.client as DiscordClient;
    await client.player?.extractors.register(YouTubeExtractor, {});

    const player = useMainPlayer();
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;

    if (!channel) return interaction.reply('You are **not** connected to a voice channel!');
    const query = interaction.options.getString('url', true);

    await interaction.deferReply();

    try {
      const { track } = await player!.play(channel, query, {
        nodeOptions: {
          metadata: interaction,
        }
      });

      return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
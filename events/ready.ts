import { Events } from 'discord.js';
import DiscordClient from '../client';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: DiscordClient) {
    console.log(`Ready! Logged in as ${client.user?.tag }`);
  },
};
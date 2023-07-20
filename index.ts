import dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import { readdirSync } from 'fs';
import { GatewayIntentBits } from 'discord.js';
import DiscordClient from './client';
import { Player } from 'discord-player';

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
  }
});

const handlersPath = join(__dirname, 'handlers');
const handlerFiles = readdirSync(handlersPath).filter(file => file.endsWith('Handler.ts'));

for (const file of handlerFiles) {
  const filePath = join(handlersPath, file);

  import(filePath)
    .then((handler) => {
      handler.default(client);
      console.log({ handler });
    })
    .catch(console.error);
}

console.log('Handler Loading Done');

client.login(process.env.DISCORD_TOKEN);
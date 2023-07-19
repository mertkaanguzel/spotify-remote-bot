import dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import { readdirSync } from 'fs';
import { GatewayIntentBits } from 'discord.js';

import DiscordClient from './client';

const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
  ],
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

/*
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag }`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  console.log({ interaction });

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
*/
client.login(process.env.DISCORD_TOKEN);
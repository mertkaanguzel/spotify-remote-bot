import DiscordClient from '../client';
import { join } from 'path';
import { readdirSync } from 'fs';

export default async(client: DiscordClient) => {
  const commandsPath = join(__dirname, '../commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command  = await import(filePath);
    console.log({ command });

    if (!command.default.data || !command.default.execute) {
      console.log(`[ERROR] ${file} command file not loaded`);
      continue;
    }

    client.commands.set(command.default.data.name, command.default);
  }

  console.log('Command Loading Done');
};
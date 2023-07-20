import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import { readdirSync } from 'fs';

const commands: any[] = [];

const foldersPath = join(__dirname, '../commands');
const commandFolders = readdirSync(foldersPath);

(async () => {
  for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command  = await import(filePath);
  
      if (!command.default.data || !command.default.execute) {
        console.log(`[ERROR] ${file} command file not loaded`);
        continue;
      }
  
      commands.push(command.default.data.toJSON());
    }
  }
  const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data: any = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENTID as string, process.env.GUILDID as string),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
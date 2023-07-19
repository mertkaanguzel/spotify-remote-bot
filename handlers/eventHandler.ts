import DiscordClient from '../client';
import { join } from 'path';
import { readdirSync } from 'fs';

export default async(client: DiscordClient) => {
  const eventsPath = join(__dirname, '../events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event  = await import(filePath);

    if (!event.default.name || !event.default.execute) {
      console.log(`[ERROR] ${file} event file not loaded`);
      continue;
    }

    console.log({ event });

    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }

  console.log('Event Loading Done');
};
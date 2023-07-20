import { Player } from 'discord-player';
import { Client, ClientOptions, Collection } from 'discord.js';

export interface IDiscordClient {
  commands: Collection<string, any>;
}

export default class DiscordClient extends Client implements IDiscordClient {
  public commands: Collection<string, any>;
  public player: Player | undefined;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.player = undefined;
  }
}
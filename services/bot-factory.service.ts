import { BotService, IBotService } from './bot.service';
import { Constructor } from '../types';

export interface ICreateProperty {
  token: string;
  polling: boolean;
  module: Constructor;
}

export interface IBotFactory {
  create(property: ICreateProperty, callback?: () => void): Promise<IBotService>;
}

class BotFactoryService implements IBotFactory {
  private bot: IBotService | null = null;

  async create(property: ICreateProperty, callback?: () => void) {
    return (this.bot = new BotService(property.token, property.polling, callback));
  }
}

export const BotFactory: IBotFactory = new BotFactoryService();

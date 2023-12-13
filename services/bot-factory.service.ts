import { BotService } from './bot.service';
import { TConstructor } from '../types';

/**
 * Написать типы
 */
class BotFactoryService {
  private bot: BotService | null = null;

  async create(
    property: { token: string; polling: boolean; module: TConstructor },
    callback?: () => void,
  ) {
    return (this.bot = new BotService(property.token, property.polling, callback));
  }
}

export const BotFactory: BotFactoryService = new BotFactoryService();

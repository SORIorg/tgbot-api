import { BotService, IBotService } from './bot.service';
import { BotMessage, BotMessageOptions, Constructor } from '../types';

export interface ICreateProperty {
  token: string;
  polling: boolean;
  module: Constructor;
}

export interface IBotFactory {
  create(property: ICreateProperty, callback?: () => void): Promise<IBotService>;
  sendMessage(chatId: number, message: string, options?: BotMessageOptions): Promise<BotMessage>
  deleteMessage(chatId: number, messageId: number): Promise<boolean>
}

class BotFactoryService implements IBotFactory {
  private bot: IBotService | null = null;

  async create(property: ICreateProperty, callback?: () => void) {
    return (this.bot = new BotService(property.token, property.polling, callback));
  }

  async sendMessage(chatId: number, message: string, options?: BotMessageOptions) {
    if (!this.bot) throw new Error('Bot is not initialized')
    return this.bot.sendMessage(chatId, message, options);
  }

  async deleteMessage(chatId: number, messageId: number) {
    if (!this.bot) throw new Error('Bot is not initialized')
    return this.bot.deleteMessage(chatId, messageId);
  }
}

export const BotFactory: IBotFactory = new BotFactoryService();

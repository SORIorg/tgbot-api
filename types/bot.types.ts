import TelegramBot from 'node-telegram-bot-api';

export type BotMessage = TelegramBot.Message;
export type BotMetadata = TelegramBot.Metadata;
export type BotMessageOptions = TelegramBot.SendMessageOptions;
export type Constructor = new (...args: any[]) => object;
/**
 * @param {string} command command like /start
 * @param {string} description description about command
 * @param {BotMessageOptions} messageOptions message options
 */
export type MethodDecoratorOptions = [messageOptions?: BotMessageOptions, command?: string, description?: string];

export interface IClassData {
  target: Constructor;
  method: string;
  options?: BotMessageOptions;
}

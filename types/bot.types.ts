import TelegramBot from 'node-telegram-bot-api';

export type BotMessage = TelegramBot.Message;
export type BotMetadata = TelegramBot.Metadata;
export type BotCallbackQuery = TelegramBot.CallbackQuery;
export type BotMessageOptions = TelegramBot.SendMessageOptions;
export type Constructor = new (...args: any[]) => object;
/**
 * @param {BotMessageOptions} messageOptions message options
 * @param {string} command command like /start
 * @param {string} description description about command
 */
export type MessageDecoratorOptions = {
  command?: string;
  description?: string;
  botMessageOptions?: BotMessageOptions;
};
/**
 * @param {BotMessageOptions} messageOptions message options
 * @param {string} command query like "Reg"
 */
export type QueryDecoratorOptions = MessageDecoratorOptions extends [...infer Rest, unknown?]
  ? Rest
  : never;

export interface IClassData {
  target: Constructor;
  method: string;
  options?: BotMessageOptions;
}

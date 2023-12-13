import TelegramBot from 'node-telegram-bot-api';

export type BotMessage = TelegramBot.Message;
export type BotMetadata = TelegramBot.Metadata;
export type Constructor = new (...args: any[]) => object;
export type BotMessageOptions = TelegramBot.SendMessageOptions;

export interface IClassData {
  target: Constructor;
  method: string;
  options?: BotMessageOptions;
}

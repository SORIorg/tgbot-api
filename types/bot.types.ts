import TelegramBot from 'node-telegram-bot-api';

export interface BotMessage extends TelegramBot.Message {}
export interface BotMetadata extends TelegramBot.Metadata {}
export interface BotMessageOptions extends TelegramBot.SendMessageOptions {}
export type Constructor = new (...args: any[]) => object;

export interface IClassData {
  target: Constructor;
  method: string;
  options?: BotMessageOptions;
}

import TelegramBot from 'node-telegram-bot-api';

export type TMessage = TelegramBot.Message;
export type TMetadata = TelegramBot.Metadata;
export type TConstructor = new (...args: any[]) => object;

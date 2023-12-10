import TelegramBot from 'node-telegram-bot-api';

export type TMessage = TelegramBot.Message;
export type TMetadata = TelegramBot.Metadata;
export type TListener = (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => void;
export type TBotFactory = TelegramBot;

export type TypeOfListener = 'message' | 'callback_query';

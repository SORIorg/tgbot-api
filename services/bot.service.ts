import TelegramBot from 'node-telegram-bot-api';

export type listenerType = (
  message: TelegramBot.Message,
  metadata: TelegramBot.Metadata,
) => void;

export class BotService {
  private bot: TelegramBot;

  constructor(token: string, polling: boolean) {
    this.bot = new TelegramBot(token, { polling: polling });
  }

  async msgOn(listener: listenerType) {
    return this.bot.on('message', listener);
  }
}

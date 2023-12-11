import TelegramBot from 'node-telegram-bot-api';
import { CommandMapper, MessageMapper } from '../decorators';
import { TMessage, TMetadata } from '../types';

export class BotService extends TelegramBot {
  constructor(token: string, polling: boolean, callback?: () => void) {
    super(token, { polling: polling });
    if (callback) callback();
  }

  async addController<C>(options: {
    controllers: [C];
    message?: boolean;
    callbackQuery?: boolean;
  }) {
    await this.setMyCommands([...CommandMapper]);
    if (options.message) this.on('message', this.messageListener);
    if (options.callbackQuery) this.on('callback_query', this.queryListener);
  }

  private async messageListener(message: TMessage, metadata: TMetadata) {
    const path: string = message.text ? message.text : '';
    const isFunc = MessageMapper.get(path);
    if (!isFunc) return;
    const result = isFunc(message, metadata);
    if (result) await this.sendMessage(message.chat.id, String(result));
  }

  private async queryListener(query: TelegramBot.CallbackQuery) {
    const path: string = query.data ? query.data : '';
    const chatId: number | undefined = query.message?.chat.id;
    if (!chatId) throw new Error('Chat ID is not defined');
    const isFunc = MessageMapper.get(path);
    if (!isFunc) return;
    const result = isFunc(query);
    if (result) await this.sendMessage(chatId, String(result));
  }
}

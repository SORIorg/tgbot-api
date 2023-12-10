import TelegramBot from 'node-telegram-bot-api';
import { CommandMapper, MessageMapper } from '../decorators';
import { TMessage, TMetadata, TypeOfListener } from '../types';

export class BotService extends TelegramBot {
  constructor(token: string, polling: boolean, callback?: () => void) {
    super(token, { polling: polling });
    if (callback) callback();
  }

  async addController<C>(type: TypeOfListener, _controller: C) {
    await this.setMyCommands([...CommandMapper]);
    this.on(type, type === 'message' ? this.messageListener : this.queryListener);
  }

  private async messageListener(message: TMessage, metadata: TMetadata) {
    const path: string = message.text ? message.text : '';
    const isFunc = MessageMapper.get(path);
    if (!isFunc) return;
    const result = isFunc(message, metadata);
    if (result) await this.sendMessage(message.chat.id, String(result));
  }

  private async queryListener(query: TelegramBot.CallbackQuery) {}
}

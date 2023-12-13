import TelegramBot from 'node-telegram-bot-api';
import { Constructor, BotMessage, BotMetadata, IClassData } from '../types';
import 'reflect-metadata';
import { Container } from '../decorators';

/**
 * Доделать квери лисенер
 * Изменить any тип
 */

export interface IBotService {
  messageListenerOn(): void;
  messageListenerOff(): void;
}

export class BotService implements IBotService {
  private bot: TelegramBot;

  constructor(token: string, polling: boolean, callback?: () => void) {
    this.bot = new TelegramBot(token, { polling: polling });
    if (callback) callback();
  }

  async messageListenerOn() {
    this.bot.on('message', this.messageListener.bind(this));
  }

  async messageListenerOff() {
    this.bot.removeListener('message', this.messageListener);
  }

  private async messageListener(message: BotMessage, metadata: BotMetadata) {
    const path: string = message.text ? message.text : '';
    const chatId: number = message.chat.id;
    const pathOptions: IClassData | undefined = Container.getPath(path);
    if (!pathOptions) return;
    const isDependencies: Constructor[] | undefined = Container.getDependencies(
      pathOptions.target,
    );
    const instance = this.dependenciesSetter(pathOptions.target, isDependencies);
    const result = instance[pathOptions.method](message, metadata);
    if (result) await this.bot.sendMessage(chatId, result, pathOptions.options);
  }

  // private async queryListener(query: TelegramBot.CallbackQuery) {
  //   const path: string = query.data ? query.data : '';
  //   const chatId: number | undefined = query.message?.chat.id;
  //   if (!chatId) throw new Error('Chat ID is not defined');
  //   const isFunc = MessageMapper.get(path);
  //   if (!isFunc) return;
  //   const result = isFunc(query);
  //   if (result) await this.bot.sendMessage(chatId, String(result));
  // }

  private dependenciesSetter(
    target: Constructor,
    dependencies: Constructor[] | undefined,
  ): any {
    if (!dependencies) return new target();
    const instanceMapper = [];
    for (const dependencyTarget of dependencies) {
      const isDependencies: Constructor[] | undefined =
        Container.getDependencies(dependencyTarget);
      if (isDependencies) {
        return this.dependenciesSetter(dependencyTarget, isDependencies);
      }
      const dependencyInstance = new dependencyTarget();
      instanceMapper.push(dependencyInstance);
    }
    return new target(...instanceMapper);
  }
}

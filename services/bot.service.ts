import TelegramBot from 'node-telegram-bot-api';
import { TConstructor, TMessage, TMetadata } from '../types';
import 'reflect-metadata';
import { Container } from '../decorators';

/**
 * Доделать квери лисенер
 * Изменить any тип
 */
export class BotService {
  bot: TelegramBot;

  constructor(token: string, polling: boolean, callback?: () => void) {
    this.bot = new TelegramBot(token, { polling: polling });
    if (callback) callback();
  }

  async messageListenerOn() {
    return this.bot.on('message', this.messageListener.bind(this));
  }

  private async messageListener(
    message: TMessage,
    metadata: TMetadata,
  ): Promise<TMessage> {
    const path: string = message.text ? message.text : '';
    const chatId = message.chat.id;
    const { target, method }: { target: TConstructor; method: string } =
      Container.getPath(path);
    const isDependencies: TConstructor[] | undefined = Container.getDependencies(target);
    const instance = this.dependenciesSetter(target, isDependencies);
    const result = instance[method](message, metadata);
    return this.bot.sendMessage(chatId, result);
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
    target: TConstructor,
    dependencies: TConstructor[] | undefined,
  ): any {
    if (!dependencies) return new target();
    const instanceMapper = [];
    for (const dependencyTarget of dependencies) {
      const isDependencies: TConstructor[] | undefined =
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

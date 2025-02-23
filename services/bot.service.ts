import TelegramBot from 'node-telegram-bot-api';
import { Constructor, BotMessage, BotMetadata, IClassData, BotMessageOptions, BotCallbackQuery } from '../types';
import 'reflect-metadata';
import { Container } from '../di';

/**
 * Доделать квери лисенер
 * Изменить any тип
 */

export interface IBotService {
  messageListenerOn(): void;
  messageListenerOff(): void;
  queryListenerOn(): void;
  queryListenerOff(): void;
  sendMessage(chatId: number, message: string, options?: BotMessageOptions): Promise<BotMessage>;
  deleteMessage(chatId: number, messageId: number): Promise<boolean>;
}

export class BotService implements IBotService {
  private bot: TelegramBot;

  constructor(token: string, polling: boolean, callback?: () => void) {
    this.bot = new TelegramBot(token, { polling: polling });
    this.bot.setMyCommands(Container.getDescriptions());
    if (callback) callback();
  }

  async messageListenerOn() {
    this.bot.on('message', this.messageListener.bind(this));
  }

  async messageListenerOff() {
    this.bot.removeListener('message', this.messageListener);
  }

  async queryListenerOn() {
    this.bot.on('callback_query', this.queryListener.bind(this))
  }

  async queryListenerOff() {
    this.bot.removeListener('callback_query', this.queryListener);

  }

  async sendMessage(chatId: number, message: string, options?: BotMessageOptions) {
    return this.bot.sendMessage(chatId, message, options);
  }

  async deleteMessage(chatId: number, messageId: number) {
    return this.bot.deleteMessage(chatId, messageId);
  }

  private async messageListener(message: BotMessage, metadata: BotMetadata) {
    const path: string = message.text ? message.text : '';
    const chatId: number = message.chat.id;
    const pathOptions: IClassData | undefined = Container.checkPath(path) ? Container.getMessagePath(path) : Container.getMessagePath(' ');
    if (!pathOptions) return;
    const isDependencies: Constructor[] | undefined = Container.getDependencies(
      pathOptions.target,
    );
    const instance = this.dependenciesSetter(pathOptions.target, isDependencies);
    const result = await instance[pathOptions.method](message, metadata);
    if (result) await this.bot.sendMessage(chatId, result, pathOptions.options);
  }

  private async queryListener(query: BotCallbackQuery) {
    const path: string = query.data ? query.data : '';
    const chatId: number | undefined = query.message?.chat.id;
    if (!chatId) throw new Error('Chat ID is not defined');
    const pathOptions: IClassData | undefined = Container.getQueryPath(path);
    if (!pathOptions) return;
    const isDependencies: Constructor[] | undefined = Container.getDependencies(
      pathOptions.target,
    );
    const instance = this.dependenciesSetter(pathOptions.target, isDependencies);
    const result = await instance[pathOptions.method](query);
    if (result) await this.bot.sendMessage(chatId, result, pathOptions.options);
  }

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

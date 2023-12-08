import { BotService } from './bot.service';
import { Message } from '../decorators/method.decorator';
import { Mapper } from '../decorators/mapper';
import TelegramBot from 'node-telegram-bot-api';

const bot: BotService = new BotService('6294908939:AAFgIT31b461qbb0TPKcHCmDFmU_yJ72fx8', true);

export class testListenerClass {
  @Message('testFunc')
  testFunc(userId: any) {
    console.log('Тут будет выводиться лог по определенному декоратору');
    console.log('userId IN FUNC: ', userId);
  }
}

const testListener = (message: TelegramBot.Message, metadata: TelegramBot.Metadata) => {
  console.log('message: ', message);
  const isFunc = Mapper.get('testFunc');
  console.log('IS FUNC: ', isFunc);
  isFunc(message)
};

const test = new testListenerClass();

bot.msgOn(testListener);

// test.testFunc();

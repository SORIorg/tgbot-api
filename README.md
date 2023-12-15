# @soriorg/tgbot-api

Быстрый старт:
1. создать index.ts в котором:
Импортировать BotFactory и использовать метод create с аргументами:
токен, поллинг, и основной модуль для регистрации. Также можно передать колбек.
Запустить листенер бота.
```ts
import { BotFactory } from '@soriorg/tgbot-api';
import { AppModule } from './app.module';

async function botStart() {
  const bot: IBotService = await BotFactory.create(
    {
      token: TOKEN,
      polling: true,
      module: AppModule,
    },
    () => {
      console.log('Bot was started');
    },
  );
  bot.messageListenerOn();
}

botStart();
```
2. AppModule это класс с декоратором Registry, который принимает в себя массив контроллеров и масив сервисов:
```ts
import { Registry } from '@soriorg/tgbot-api';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Registry({
  controllers: [MessageController],
  services: [MessageService],
})
export class AppModule {}
```
3. Контроллер:
Класс контроллер оборачивается декоратором Controller.
Методы контроллера оборачиваются декоратором Message. Первым аргументом можно зарегистрировать команды по которым будет отрабатывать метод, вторым объект Message Options.
```ts
import {Controller, Message} from '@soriorg/tgbot-api';
import { MessageService } from './message.service';

@Controller
export class MessageController {
  constructor(private readonly messageService: MessageService) {} // Сервисы должны передаваться через конструктор

  @Message('/start', {
    reply_markup: {
      keyboard: [[{ text: 'first bttn' }]],
      resize_keyboard: true,
    },
  })
  start() {
    return this.messageService.start();
  }

  @Message('/test')
  test() {
    return 'test'; // Return всегда должен быть строкой, он возвращает сообщение пользователю. Если его не указать, то функция отработает но пользователь ничего не получит
  }
}
```
Если в декоратор ничего не указать или указать пробел (' '), то метод будет отрабатывать на любое пользовательское сообщение которое еще не зарегистрированно в декораторе Message.
Также, в методы неявно передаются аргументы message и metadata которые можно использовать
```ts
import {BotFactory, BotMessage, BotMetadata, Message} from '@soriorg/tgbot-api';

@Message(' ', { // указали пробел в качестве аргумента
  parse_mode: "Markdown"
})
async start(message: BotMessage, metadata: BotMetadata) { // Указываем аргументы message и metadata 
  const chatId = message.chat.id; // Получаем chat id с пользователем из аргумента message
  const messageForUser = await BotFactory.sendMessage(chatId, 'Подождите пока ваш запрос обрабатывается базой данных') // метод sendMessage отправляет сообщение (А)
  const userMessage: string = message.text; // получаем текст сообщения от пользователя из аргумента message
  const dbData = await someDatabase.find({ where: { userMessage } }) // Любой запрос в базу данных
  const messageId = messageForUser.message_id // Получаем айди нашего сообщения
  BotFactory.deleteMessage(chatId, messageId); // удаляем наше ранее отправленное сообщение из строки (А) с помощью deleteMessage
  return JSON.parse(dbData); // Отправляет запрашиваемый запрос из базы данных пользователю
}
```
4. Сервис:
Оборачивается декоратором Service для инициализации зависимостей
```ts
import { Service } from '@soriorg/tgbot-api';

@Service
export class MessageService {
  start() {
    return 'hello from service';
  }
}
```

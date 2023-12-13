# sori-tgbot-api

Быстрый старт:
1. Установить библиотеку.
2. создать index.ts в котором:
Создать асинхронную функцию, в которой импортировать BotFactory и использовать метод create
куда передать токен, поллинг, и основной модуль для регистрации. Так же можно передать колбек.
Запустить листенер бота, инициализировать функцию.
```ts
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
3. Создание AppModule:
```ts
@Registry({
  controllers: [MessageController],
  services: [MessageService],
})
export class FortestingModule {}
```
4. Контроллер:
```ts
@Controller
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
    return 'test';
  }
}
```
5. Сервис:
```ts
@Service
export class MessageService {
  start() {
    return 'hello from service';
  }
}
```

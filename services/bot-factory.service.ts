import { BotService } from './bot.service';
class BotFactoryService {
  private bot: BotService | null = null;

  async create(token: string, polling: boolean, callback?: () => void): Promise<BotService> {
    return (this.bot = new BotService(token, polling, callback));
  }
}

export const BotFactory: BotFactoryService = new BotFactoryService();

import { Constructor, IClassData } from '../types';
import { BotCommand } from 'node-telegram-bot-api';

/**
 * This DI container is needed to set the users-command and method request.
 * Also for defining dependencies within classes
 */
interface IDependencyRegistry {
  /**
   * Set the path like "/start" with method like "start(){}" and class like "controller{}"
   * @param {string} path like "/start"
   * @param {IClassData} classData class metadata along the path
   */
  setPath(path: string, classData: IClassData): void;

  /**
   * Set the class and dependencies
   * @param {Constructor} target class constructor
   * @param {Constructor} dependencies Constructors array of dependencies
   */
  setDependencies(target: Constructor, dependencies: Constructor[]): void;

  /**
   * Set descriptions for commands
   * @param {string} command command
   * @param {string} description about command
   */
  setDescription(command: string, description: string): void;

  /**
   * For checking path
   * @param {string} path path
   */
  checkPath(path: string): boolean

  /**
   * Get class metadata by path
   * @param {string} path like "/start"
   */
  getPath(path: string): IClassData | undefined;

  /**
   * Get class dependencies by class constructor
   * @param {Constructor} target class constructor
   */
  getDependencies(target: Constructor): Constructor[] | undefined;

  /**
   * For get descriptions
   */
  getDescriptions(): BotCommand[];
}

class DependencyRegistry implements IDependencyRegistry {
  private paths: Map<string, IClassData> = new Map();
  private dependencies: Map<Constructor, Constructor[]> = new Map();
  private descriptions: BotCommand[] = [];

  setPath(path: string, methodData: IClassData) {
    if (this.paths.has(path)) throw new Error(`This path ${path} already exists`);
    this.paths.set(path, methodData);
  }

  setDependencies(target: Constructor, dependencies: Constructor[]) {
    if (this.dependencies.has(target))
      throw new Error(`This class ${target.constructor.name} already exists`);
    this.dependencies.set(target, dependencies);
  }

  setDescription(command: string, description: string) {
    this.descriptions.push({command, description});
  }

  checkPath(path: string): boolean {
    return this.paths.has(path);
  }

  getPath(path: string): IClassData | undefined {
    return this.paths.get(path);
  }

  getDependencies(target: Constructor): Constructor[] | undefined {
    return this.dependencies.get(target);
  }

  getDescriptions() {
    return this.descriptions;
  }
}

export const Container: IDependencyRegistry = new DependencyRegistry();

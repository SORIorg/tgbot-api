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
   * @param {IClassData} methodData class metadata along the path
   */
  setMessagePath(path: string, methodData: IClassData): void;

  /**
   * Set the path like "Reg" with method like "register(){}" and class like "controller{}"
   * @param {string} path like "Reg"
   * @param {IClassData} methodData class metadata along the path
   */
  setQueryPath(path: string, methodData: IClassData): void;

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
  getMessagePath(path: string): IClassData | undefined;

  /**
   * Get class metadata by path
   * @param {string} query
   */
  getQueryPath(query: string): IClassData | undefined;

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
  private messagePaths: Map<string, IClassData> = new Map();
  private queryPaths: Map<string, IClassData> = new Map();
  private dependencies: Map<Constructor, Constructor[]> = new Map();
  private descriptions: BotCommand[] = [];

  setMessagePath(path: string, methodData: IClassData) {
    if (this.messagePaths.has(path)) throw new Error(`This path ${path} already exists`);
    this.messagePaths.set(path, methodData);
  }

  setQueryPath(path: string, methodData: IClassData) {
    if (this.queryPaths.has(path)) throw new Error(`This path ${path} already exists`);
    this.queryPaths.set(path, methodData);
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
    return this.messagePaths.has(path);
  }

  getMessagePath(path: string): IClassData | undefined {
    return this.messagePaths.get(path);
  }

  getQueryPath(query: string): IClassData | undefined {
    return this.queryPaths.get(query);
  }

  getDependencies(target: Constructor): Constructor[] | undefined {
    return this.dependencies.get(target);
  }

  getDescriptions() {
    return this.descriptions;
  }
}

export const Container: IDependencyRegistry = new DependencyRegistry();

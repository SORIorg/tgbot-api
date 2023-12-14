import { Container } from './dependecy.register';
import { BotMessageOptions, IClassData } from '../types';

/**
 * Message decorator to collects paths and bind with method and class
 * @param {string} trigger path like "/start"
 * @param {BotMessageOptions} options additional options for keyboard and more...
 * @constructor
 */
export function Message(trigger: string = ' ', options?: BotMessageOptions) {
  return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    const classData: IClassData = {
      target: target.constructor,
      method: propertyKey,
      options,
    };
    Container.setPath(trigger, classData);
  };
}

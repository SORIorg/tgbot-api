import { Container } from './dependecy.register';
import { IClassData, MessageDecoratorOptions } from '../types';

/**
 * Message decorator to collects paths and bind with method and class
 * @param {MessageDecoratorOptions} options command, description, message options
 * @constructor
 */
export function Message(options?: MessageDecoratorOptions) {
  const [messageOptions, command= ' ', description] = options
    ? options
    : [undefined, ' ', undefined];
  if (command && command !== ' ' && description) {
    Container.setDescription(command, description);
  }
  return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    const classData: IClassData = {
      target: target.constructor,
      method: propertyKey,
      options: messageOptions,
    };
    Container.setMessagePath(command, classData);
  };
}

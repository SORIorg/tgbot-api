import { Container } from './dependecy.register';
import { IClassData, MethodDecoratorOptions } from '../types';

/**
 * Message decorator to collects paths and bind with method and class
 * @param {MethodDecoratorOptions} options command, description, message options
 * @constructor
 */
export function Message(options?: MethodDecoratorOptions) {
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
    Container.setPath(command, classData);
  };
}

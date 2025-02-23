import { Container } from '../di';
import { IClassData, MessageDecoratorOptions } from '../types';

/**
 * Message decorator to collects paths and bind with method and class
 * @param {MessageDecoratorOptions} options command, description, message options
 * @constructor
 */
export function Message(options?: MessageDecoratorOptions) {
  const command = options?.command ? options.command : ' ';
  const description = options?.description;
  const messageOptions = options?.botMessageOptions;
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

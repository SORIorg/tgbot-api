import { Container } from '../di';
import { IClassData, QueryDecoratorOptions } from '../types';

/**
 * Query decorator to collects paths and bind with method and class
 * @param {QueryDecoratorOptions} options command, message options
 * @constructor
 */
export function Query(options: QueryDecoratorOptions) {
  const [messageOptions, query] = options;
  if (!query) throw new Error('Query path cannot be empty')
  return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    const classData: IClassData = {
      target: target.constructor,
      method: propertyKey,
      options: messageOptions,
    };
    Container.setQueryPath(query, classData);
  };
}

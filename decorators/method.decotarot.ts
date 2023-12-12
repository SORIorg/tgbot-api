import { Container } from './dependecy.register';
import { TConstructor } from '../types';

/**
 * Тип на classData
 */
export function Message(trigger: string = '') {
  return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    const classData: { target: TConstructor; method: string } = {
      target: target.constructor,
      method: propertyKey,
    };
    Container.setPath(trigger, classData);
  };
}

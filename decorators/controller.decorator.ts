import { Container } from './dependecy.register';
import { Constructor } from '../types';

/**
 * Controller decorator for collects dependencies from metadata in DI
 * @param {Constructor} target class constructor
 */
export function Controller(target: Constructor) {
  const dependencies = Reflect.getMetadata('design:paramtypes', target);
  Container.setDependencies(target, dependencies);
}

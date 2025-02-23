import { Constructor } from '../types';
import { Container } from '../di';

/**
 * Service decorator for collects dependencies from metadata in DI
 * @param {Constructor} target class constructor
 */
export function Service(target: Constructor) {
  const dependencies = Reflect.getMetadata('design:paramtypes', target);
  Container.setDependencies(target, dependencies);
}

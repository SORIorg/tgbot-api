import { Container } from './dependecy.register';
import { TConstructor } from '../types';

export function Controller(target: TConstructor) {
  const dependencies = Reflect.getMetadata('design:paramtypes', target);
  Container.setDependencies(target, dependencies);
}

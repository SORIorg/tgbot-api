import { TConstructor } from '../types';
import { Container } from './dependecy.register';

export function Service(target: TConstructor) {
  const dependencies = Reflect.getMetadata('design:paramtypes', target);
  Container.setDependencies(target, dependencies);
}

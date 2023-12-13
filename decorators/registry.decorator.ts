import { Constructor } from '../types';

/**
 * Registry decorator without direct functionality
 * Need to init register classes
 */
interface ISettings {
  controllers: Constructor[];
  services: Constructor[];
}

export function Registry(settings: ISettings) {
  return function (target: Constructor) {};
}

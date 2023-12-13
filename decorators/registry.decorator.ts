/**
 * придумать функционал декоратору Registry
 */
export function Registry(settings: any) {
  return function <T extends { new (...args: any[]): object }>(target: T) {};
}

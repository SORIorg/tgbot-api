export function Injectable<T extends { new (...args: any[]): object }>(
  constructor: T,
  context: any,
) {
  console.log('Constructor: ', constructor);
  console.log('context: ', context);
  console.log('Decorator work');
}

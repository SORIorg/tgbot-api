import { Mapper } from './mapper';

export function Message(message: string = '') {
  return function actualDecorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    console.log('Method: ', target);
    console.log('context: ', context);

    const replacementMethod = function(this: This, ...args: Args) {
      console.log('Мы внутри декоратора');
      console.log('ARGS: ', args);
      const result = target.call(this, ...args);
      console.log('Декоратор отработал');
      return result;
    };
    Mapper.set(message, replacementMethod);

  };
}

// export function Req(target: any, propertyKey: any, parameterIndex: any) {
//   return function (target: any, context: any) {
//     console.log('REQ: ', target);
//     console.log('CONTEXT: ', context);
//   }
// }

import { CommandMapper, MessageMapper } from './mappers';

/**
 *Decorator for class-controller method
 * @param message - command route. For example "/start"
 * @param description - command description. For example "go to start"
 * @constructor
 */
export function Message(message: string = '', description?: string) {
  if (message && description) CommandMapper.add({ command: message, description: description });
  return function actualDecorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    const replacementMethod = function (this: This, ...args: Args) {
      return target.call(this, ...args);
    };
    MessageMapper.set(message, replacementMethod);
  };
}

import { TConstructor } from '../types';

/**
 * Написать интерфейс
 */
class DependencyRegistry {
  private paths: Map<string, { target: TConstructor; method: string }> = new Map();
  private dependencies: Map<TConstructor, TConstructor[]> = new Map();

  setPath(path: string, methodData: { target: TConstructor; method: string }) {
    if (this.paths.has(path)) throw new Error(`This path ${path} already exists`);
    this.paths.set(path, methodData);
  }

  setDependencies(target: TConstructor, dependencies: TConstructor[]) {
    if (this.dependencies.has(target))
      throw new Error(`This class ${target.constructor.name} already exists`);
    this.dependencies.set(target, dependencies);
  }

  getPath(path: string): { target: TConstructor; method: string } {
    const result: { target: TConstructor; method: string } | undefined =
      this.paths.get(path);
    if (!result) throw new Error(`nothing is registered along the ${path} path`);
    return result;
  }

  getDependencies(target: TConstructor): TConstructor[] | undefined {
    return this.dependencies.get(target);
  }
}

export const Container: DependencyRegistry = new DependencyRegistry();

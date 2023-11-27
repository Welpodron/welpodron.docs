export const deferred = <T = unknown>(): Promise<T> & {
  resolve: (value?: T | PromiseLike<T>) => void;
} => {
  let resolver, promise;
  promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
  });
  (
    promise as Promise<T> & { resolve: (value: T | PromiseLike<T>) => void }
  ).resolve = resolver as unknown as (value: T | PromiseLike<T>) => void;
  return promise as Promise<T> & {
    resolve: (value?: T | PromiseLike<T>) => void;
  };
};

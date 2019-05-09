import StandardError from "../../lib/io/StandardError";

export type OrNull<T> = T | null;
export type OrUndefined<T> = T | undefined;
export type Maybe<T> = OrNull<OrUndefined<T>>;
export type StringMap<V> = { [key: string]: V };
export type Operation<V> = {
  error: Maybe<StandardError>;
  value: Maybe<V>;
};
export type AsyncOperation<V> = Promise<Operation<V>>;

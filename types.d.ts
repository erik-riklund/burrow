export { };

// The types below are global utility types, not specific to any module.

declare global
{
  /**
   * Represents an array of JSON values.
   */
  type JsonArray = JsonValue[];

  /**
   * Represents an object with string keys and JSON values.
   */
  type JsonObject = { [key: string]: JsonValue; };

  /**
   * Represents a JSON value.
   */
  type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonArray;

  /**
   * Represents a value that could be `undefined`.
   */
  type Optional<T> = T | undefined;

  /**
   * Represents a value that could be `null`.
   */
  type MaybeNull<T> = T | null;

  /**
   * Represents a value that could be `void`.
   */
  type MaybeVoid<T> = T | void;

  /**
   * Represents a value that could be a `Promise`.
   */
  type MaybePromise<T> = T | Promise<T>;
}
export type EmptyObject<Key extends string | number = string | number, T = any> = {
  [K in Key]: T;
};

type AnyFunction = (...args: any[]) => any;

type TopLevelProperty =
  | number
  | string
  | boolean
  | symbol
  | undefined
  | null
  | void
  | AnyFunction
  | Date;

export type Cast<T, TComplex, TCastTo extends TComplex> = T extends object
  ? CastObject<T, TComplex, TCastTo>
  : T;

export type CastObject<T, TComplex, TCastTo extends TComplex> = {
  [K in keyof T]: T[K] extends TopLevelProperty
    ? T[K]
    : T[K] extends Array<infer U>
      ? Array<Cast<U, TComplex, TCastTo>>
      : T[K] extends TComplex
        ? TCastTo
        : Cast<T[K], TComplex, TCastTo>
};

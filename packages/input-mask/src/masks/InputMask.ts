export type InputMask = Array<string | RegExp> | boolean;

export type InputMaskProvider = (value: string) => InputMask;

/* eslint-disable @typescript-eslint/no-explicit-any */

export type InputMaskPipe = (
  conformedValue: string,
  config: any
) => false | string | { value: string; indexesOfPipedChars: number[] };

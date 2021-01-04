export const exhaustSwitchCaseElseThrow = (arg: never) => {
  throw new Error(`Switch unhandled case: ${arg}`);
};

export const exhaustSwitchCase = <T>(_arg: never, fallback: T) => {
  return fallback;
};

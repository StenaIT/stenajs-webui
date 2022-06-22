import { ReducerIdGateAction } from "./reducer-id-gate";

type ActionCreator = (...args: any) => any;

export type ActionCreatorCreator<TActionCreator extends ActionCreator> = (
  ...args: Parameters<TActionCreator>
) => ReducerIdGateAction<ReturnType<TActionCreator>>;

export const wrapActionWithReducerIdGate =
  <TActionCreator extends ActionCreator>(
    reducerId: string,
    actionCreator: TActionCreator
  ): ActionCreatorCreator<TActionCreator> =>
  (...args) => {
    return {
      type: "REDUCER_ID_GATE:ACTION",
      reducerId,
      action: actionCreator(...args),
    };
  };

export interface ActionCreatorsMapObject {
  [key: string]: ActionCreator;
}

export type ReducerIdGatedActionCreator<
  TActionCreators extends ActionCreatorsMapObject
> = {
  [K in keyof TActionCreators]: ActionCreatorCreator<TActionCreators[K]>;
};

export const wrapActionsWithReducerIdGate = <
  TActionCreators extends ActionCreatorsMapObject
>(
  reducerId: string,
  actionCreators: TActionCreators
): ReducerIdGatedActionCreator<TActionCreators> => {
  const boundActionCreators =
    {} as ReducerIdGatedActionCreator<TActionCreators>;
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = wrapActionWithReducerIdGate(
      reducerId,
      actionCreator
    );
  }
  return boundActionCreators;
};

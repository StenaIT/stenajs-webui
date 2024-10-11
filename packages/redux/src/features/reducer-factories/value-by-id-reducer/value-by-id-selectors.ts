import { ValueByIdState } from "./value-by-id-reducer";

export interface ValueByIdSelectors<TStoreState, TValue> {
  getState: ValueByIdStateSelector<TStoreState, TValue>;
}

export type ValueByIdStateSelector<TStoreState, TValue> = (
  state: TStoreState,
) => ValueByIdState<TValue>;

export const createValueByIdSelectors = <TStoreState, TValue>(
  stateSelector: ValueByIdStateSelector<TStoreState, TValue>,
): ValueByIdSelectors<TStoreState, TValue> => ({
  getState: stateSelector,
});

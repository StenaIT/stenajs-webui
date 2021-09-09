import { ValueByIdState } from "./value-by-id-reducer";

export interface EntityByIdSelectors<TStoreState, TValue> {
  getState: EntityByIdStateSelector<TStoreState, TValue>;
}

export type EntityByIdStateSelector<TStoreState, TValue> = (
  state: TStoreState
) => ValueByIdState<TValue>;

export const createValueByIdSelectors = <TStoreState, TValue>(
  stateSelector: EntityByIdStateSelector<TStoreState, TValue>
): EntityByIdSelectors<TStoreState, TValue> => ({
  getState: stateSelector,
});

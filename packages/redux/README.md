# stenajs-webui/redux

This package contains utilities that can help creating Redux features.

## commit-reducer

This makes it easy to have a state split into workspace and committed
state.

This can be useful when editing a form, which uses workspace state.
When user presses enter, it is committed.

A search query is built from committed state, and thus, the search
is triggered when the commit occurs, instead of on every keystroke.

#### Reducer
```js
export const timeTableFilterReducer = createCommitReducer<
  TimeTableFilterState
>("timeTableFilter", {
  workspace: INITIAL_STATE,
  committed: INITIAL_STATE
});
```

* First argument is the id of the reducer. (You can have multiple)
* Second argument is initial state, which must be `{ workspace: X, committed: Y }`.
* X can be the same as Y, but it is not required.

#### Actions

```js
export const timeTableActions = createCommitReducerActions<TimeTableFilterState>(
  "timeTableFilter"
);
```

* The first argument is the id of the reducer.

#### Selectors

```js
export const timeTableSelectors = createCommitReducerSelectors<
  StoreState,
  TimeTableFilterState
>(state => state.timeTableFilter, "timeTableFilter");
```

* First argument is the id of the reducer.
* Second argument is a selector which selects the reducers state from global store state.

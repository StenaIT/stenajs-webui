# stenajs-webui/redux

This package contains utilities that can help creating Redux features.

### Commited

This makes it easy to have a state split into workspace and committed
state.

This can be useful when editing a form, which uses workspace state.
When user presses enter, it is committed.

A search query is built from committed state, and thus, the search
is triggered when the commit occurs, instead of on every keystroke.

```js
export const timeTableFilterReducer = createCommittedReducer<
  TimeTableFilterState
>("timeTableFilter", {
  workspace: INITIAL_STATE,
  committed: INITIAL_STATE
});
```

# stenajs-webui/redux

This package contains utilities that can help create Redux features.

## Higher order reducers

### reducerIdGate

Creates a reducer that requires action.reducerId to match specified reducerId.

### recordObjectReducer

Creates a reducer that applies the inner reducer to a `state[action.recordId]` instead
of directly to `state`.

## Reducer factories

### commit-reducer

This reducer keeps a workspace state and a committed state.
Changes can be made to workspace, which can then be committed.

### entity-by-id-reducer

This reducer stores entities by id. Entities can be added, removed and updated.

### entity-reducer

This reducer stores a single entity. It can be replaced and partially updated.

### entity-list-reducer

This reducer stores a list and provides actions for manipulating the items in the list.

### entity-crud-status-reducer

This reducer uses entity-by-id-reducer to store information about current
CRUD operation state. It contains flags such as `loading`, `error`, etc.

### modified-field-reducer

This reducer uses entity-by-id-reducer to store information about a change
made to something. For example, if a user enters data into fields in a form,
you can keep track of the changes made by the users to batch all updates.

### selected-ids-reducer

This reducer contains a list of ids that can be toggled on or off.
This can be used when having a list of checkboxes that can be toggled on or off.

### sort-order-by-id-reducer

This reducer keeps track of a sort order where the order is determined by a
list of ids. This is useful when different lists sort the same entity, but
does not have access to the same fields.

### sort-order-reducer

This reducer keeps track of sort order by key, such as column name.

# Usage

Here is an example.

## commit-reducer

This makes it easy to have a state split into workspace and committed
state.

This can be useful when editing a form, which uses workspace state.
When user presses enter, it is committed.

A search query is built from committed state, and thus, the search
is triggered when the commit occurs, instead of on every keystroke.

#### Reducer

```js
export const timeTableFilterReducer =
  createCommitReducer<TimeTableFilterState>("timeTableFilter",
  {
    workspace: INITIAL_STATE,
    committed: INITIAL_STATE
  });
```

- First argument is the id of the reducer. (You can have multiple)
- Second argument is initial state, which must be `{ workspace: X, committed: Y }`.
- X can be the same as Y, but it is not required.

#### Actions

```js
export const { setValues, commitValues, clearValues } =
  createCommitReducerActions<TimeTableFilterState>("timeTableFilter");

// In component
const dispatch = useDispatch();
dispatch(setValues({ email: "tomte@nordpolen.se" }));
```

- The first argument is the id of the reducer.

#### Selectors

```js
export const { getWorkspaceValues, getCommittedValues } = createCommitReducerSelectors<
  StoreState,
  TimeTableFilterState
>("timeTableFilter", state => state.timeTableFilter);

// In component
const filterValues = useSelector(getWorkspaceValues);

```

- First argument is the id of the reducer.
- Second argument is a selector which selects the reducers state from global store state.

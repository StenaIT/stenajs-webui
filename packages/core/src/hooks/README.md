# @stenajs-webui hooks

## Overview

All hook names are prefixed with `use`, as per React conventions.

## Hooks

### useArraySet

Creates methods for adding, removing and toggling element in list.
Item is only added if not already in list.
Takes `list` and `setList` methods as arguments.

Returns: [add, remove, toggle]

```js
const [list, setList] = useState(['world']);
const {add, remove, toggle} = useArraySet(list, setList);
toggle('hello');
// Adds 'hello' to the list, if it doesn't already exist.
```

### useBoolean

Wraps a state, but returns setTrue, setFalse, toggle methods, instead of normal setter.

Returns: [value, setTrue, setFalse, toggle]

```js
const [mouseIsOver, setMouseIsOver, setMouseIsNotOver] = useBoolean(false);
```

### useDebounce

Debounced the changes of a value.
Pass the value you want to debounce as only argument.

Returns: The debounced value.

#### Example

```js
const searchQueryToApi = useDebounce(searchQuery);
```

### useDomId

Creates a string that is unique and guaranteed to persist through component lifecycle.
Can take an optional string argument which is included in the id. It must be a valid id token.

Returns: The id as a string.

#### Example

```js
const id = useDomId();
const idForCheckbox = useDomId("checkbox");
```

### useEventListener

Adds event listeners to DOM elements, using refs.

Returns: Nothing.

#### Example

```js
useEventListener(ref, "mouseover", setMouseIsOver);
useEventListener(ref, "mouseout", setMouseIsNotOver);
```

### useMouseIsOver

Returns true if mouse is over DOM element passed by ref.

Returns: Boolean, true if mouse is over.

#### Example

```js
const mouseIsOver = useMouseIsOver(ref);
```

### useMultiOnClickOutside

Executes a function when a click outside of all refs happens.

Returns: Nothing.

#### Example

```js
useOnClickOutside([modalRef, otherRef], closeModal);
```

### useOnClickOutside

Executes a function when a click outside of ref happens.

Returns: Nothing.

#### Example

```js
useOnClickOutside(ref, closeModal);
```

### useOnNoMouseInput

Calls a callback function is mouse was not used for a period of time.

Returns: Nothing.

#### Example

```js
useOnNoMouseMovement(hideModal, 10000);
```

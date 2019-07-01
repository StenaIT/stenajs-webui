# @stenajs-webui hooks

## useBoolean

Wraps a state, but returns setTrue, setFalse, toggle methods, instead of normal setter.

Returns: [value, setTrue, setFalse, toggle]

```js
const [mouseIsOver, setMouseIsOver, setMouseIsNotOver] = useBoolean(false);
```

## useDebounce

Debounced the changes of a value.
Pass the value you want to debounce as only argument.

Returns: The debounced value.

#### Example

```js
const searchQueryToApi = useDebounce(searchQuery);
```

## useEventListener

Adds event listeners to DOM elements, using refs.

Returns: Nothing.

#### Example

```js
useEventListener(ref, "mouseover", setMouseIsOver);
useEventListener(ref, "mouseout", setMouseIsNotOver);
```

## useMouseIsOver

Returns true if mouse is over DOM element passed by ref.

Returns: Boolean, true if mouse is over.

#### Example

```js
const mouseIsOver = useMouseIsOver(ref);
```

## useMultiOnClickOutside

Executes a function when a click outside of all refs happens.

Returns: Nothing.

#### Example

```js
useOnClickOutside([modalRef, otherRef], closeModal);
```

## useOnClickOutside

Executes a function when a click outside of ref happens.

Returns: Nothing.

#### Example

```js
useOnClickOutside(ref, closeModal);
```

## useOnNoMouseInput

Calls a callback function is mouse was not used for a period of time.

Returns: Nothing.

#### Example

```js
useOnNoMouseMovement(hideModal, 10000);
```

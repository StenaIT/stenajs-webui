# NumericTextInput

This component uses string as value data type.
This allows it to be flexible, but it also adds a bit of work for handling the data
(parsing, handling invalid number strings, etc).

If you need numeric data type, there is a hook available.

## A wild hook appears: useNumericInputValue

This hooks uses `number | undefined` as data type.
This means that the prop `value` (and the argument on `onValueChange`) is of type `number | undefined`.

`value` and `onValueChange` are passed as arguments to the hook, and it then returns an object
with new `value` and `onValueChange` fields.

You can use it like this:

```jsx
const numericProps = useNumericInputValue(value, onValueChange);
return <NumericTextInput {...numericProps} />;
```

## No onChange

`NumericTextInput` can trigger changes from input in the text field, or by pressing up and down buttons.
Since up and down buttons don't have `event.target.value`, there is currently no `onChange` prop.

This might change in the future.

`onValueChange` is available as usual.

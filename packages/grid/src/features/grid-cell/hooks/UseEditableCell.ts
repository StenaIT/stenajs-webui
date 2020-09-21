import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { RevertableValue, useRevertableValue } from "./UseRevertableValue";

export type AllowedInputType = "all" | "numeric" | "alphanumeric" | "letters";

type OnStartEditingFunc = (keyEvent?: KeyDownEvent) => void;
type TransformEnteredValueFunc<TValue> = (value?: string) => TValue;

export interface UseEditableCellOptions<TValue> {
  /**
   * Specifies if cell is editable.
   */
  isEditable?: boolean;
  /**
   * Types of keyboard input that will start editing and pre-fill editor.
   */
  allowedInputType?: AllowedInputType;
  /**
   * Callback that is invoked when editing a cell is started.
   * @param keyEvent
   */
  onStartEditing?: OnStartEditingFunc;
  /**
   * Callback that is invoked when editing a cell stops.
   */
  onStopEditing?: () => void;
  /**
   * Callback that is invoked when editing a cell is finished with a value result.
   * @param value
   */
  onChange?: (value: TValue | undefined) => void;
  /**
   * Transform entered input to TValue.
   * @param value
   */
  transformEnteredValue?: TransformEnteredValueFunc<TValue>;
}

export interface UseEditableCellResult<TValue> {
  onKeyDown: React.KeyboardEventHandler;
  isEditing: boolean;
  startEditing: OnStartEditingFunc;
  stopEditing: () => void;
  stopEditingAndRevert: () => void;
  lastKeyEvent: KeyDownEvent | undefined;
  revertableValue: RevertableValue<TValue>;
  onDoubleClick: () => void;
}

export interface KeyDownEvent {
  altKey: boolean;
  charCode: number;
  ctrlKey: boolean;
  key: string;
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  which: number;
}

const createKeyDownEvent = (event: React.KeyboardEvent): KeyDownEvent => ({
  altKey: event.altKey,
  charCode: event.charCode,
  ctrlKey: event.ctrlKey,
  key: event.key,
  keyCode: event.keyCode,
  locale: event.locale,
  location: event.location,
  metaKey: event.metaKey,
  repeat: event.repeat,
  shiftKey: event.shiftKey,
  which: event.which,
});

// tslint:disable-next-line:no-any
const defaultTransformEnteredValue = (value: any) => value;

export const useEditableCell = <TValue>(
  value: TValue,
  {
    isEditable = false,
    allowedInputType = "all",
    onChange,
    onStartEditing,
    onStopEditing,
    transformEnteredValue = defaultTransformEnteredValue,
  }: UseEditableCellOptions<TValue>
): UseEditableCellResult<TValue> => {
  const [isEditing, setIsEditing] = useState(false);
  const [lastKeyEvent, setLastKeyEvent] = useState<KeyDownEvent | undefined>(
    undefined
  );
  const revertableValue = useRevertableValue<TValue>(value);
  const { getValue, revert } = revertableValue;

  const startEditing = useCallback(
    (keyEvent?: KeyDownEvent) => {
      if (isEditable) {
        setIsEditing(true);
        if (onStartEditing) {
          onStartEditing(keyEvent);
        }
      }
    },
    [isEditable, onStartEditing, setIsEditing]
  );

  const stopEditing = useCallback(() => {
    if (isEditable) {
      setIsEditing(false);
      if (onStopEditing) {
        onStopEditing();
      }
      if (onChange) {
        onChange(getValue());
      }
    }
  }, [isEditable, onChange, onStopEditing, getValue, setIsEditing]);

  const stopEditingAndRevert = useCallback(() => {
    if (isEditable) {
      setIsEditing(false);
      if (onStopEditing) {
        onStopEditing();
      }
      revert();
    }
  }, [isEditable, onStopEditing, revert, setIsEditing]);

  const onKeyDown = useMemo(
    () =>
      createKeyDownHandler(
        isEditing,
        isEditable,
        startEditing,
        setLastKeyEvent,
        allowedInputType,
        transformEnteredValue,
        revertableValue
      ),
    [
      isEditing,
      isEditable,
      startEditing,
      setLastKeyEvent,
      allowedInputType,
      transformEnteredValue,
      revertableValue,
    ]
  );

  return {
    onKeyDown,
    isEditing,
    lastKeyEvent,
    revertableValue,
    startEditing,
    stopEditing,
    stopEditingAndRevert,
    onDoubleClick: startEditing,
  };
};

const allowsNumerics = (allowedInputType: AllowedInputType): boolean =>
  allowedInputType === "all" ||
  allowedInputType === "numeric" ||
  allowedInputType === "alphanumeric";
const allowsLetters = (allowedInputType: AllowedInputType): boolean =>
  allowedInputType === "all" ||
  allowedInputType === "alphanumeric" ||
  allowedInputType === "letters";

const isCharacter = (key: string): boolean => !!key.match(/^[-+*<>]$/);
const isLetter = (key: string): boolean => !!key.match(/^[a-zA-Z0-9]$/);
const isNumeric = (key: string): boolean => !isNaN(parseInt(key, 10));

const createKeyDownHandler = <TValue>(
  _: boolean, // isEditing
  isEditable: boolean,
  startEditing: OnStartEditingFunc,
  setLastKeyEvent: (lastKeyEvent: KeyDownEvent | undefined) => void,
  allowedInputType: AllowedInputType,
  transformEnteredValue: TransformEnteredValueFunc<TValue>,
  revertableValue: RevertableValue<TValue>
): React.KeyboardEventHandler => (e) => {
  if (e.key === "Enter" && isEditable) {
    setLastKeyEvent(undefined);
    startEditing();
    revertableValue.commit();
    e.preventDefault();
    e.stopPropagation();
  } else if (!e.ctrlKey && !e.metaKey && !e.shiftKey && isEditable) {
    // TODO Find nice way to allow full user control, while also providing simplicity.
    const lastKeyEvent = createKeyDownEvent(e);
    if (
      (isNumeric(e.key) && allowsNumerics(allowedInputType)) ||
      (isLetter(e.key) && allowsLetters(allowedInputType)) ||
      isCharacter(e.key)
    ) {
      startEditing(lastKeyEvent);
      setLastKeyEvent(lastKeyEvent);
      revertableValue.commit();
      revertableValue.setValue(transformEnteredValue(lastKeyEvent.key));
      e.preventDefault();
      e.stopPropagation();
    }
  }
};

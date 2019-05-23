export interface ValueOnChangeProps<T> {
  value?: T;
  onChange?: (value: T) => void; // TODO
  onValueChange?: (value: T) => void;
}

export interface ValueOnChangeProps<T> {
  value?: T;
  onChange?: (value: T) => void;
}

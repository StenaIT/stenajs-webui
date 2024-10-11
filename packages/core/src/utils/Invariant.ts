export function invariant<T>(
  val: T | null | undefined,
  message: string,
): asserts val is T {
  if (val == null) {
    throw new Error("Invariant error: " + message);
  }
}

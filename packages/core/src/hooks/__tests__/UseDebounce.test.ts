import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, vi } from "vitest";
import { useDebounce } from "../UseDebounce";

describe("useDebounce", () => {
  vi.useFakeTimers();
  afterEach(() => {
    vi.clearAllTimers();
  });

  it("debounces", async () => {
    const firstValue = "first value";
    const delay = 1;
    const { rerender, result } = renderHook(
      ({ value }) => useDebounce(value, delay),
      {
        initialProps: { value: firstValue },
      },
    );
    const notValue = "not value";
    const newValue = "new value";
    act(() => rerender({ value: notValue }));
    act(() => rerender({ value: newValue }));
    expect(result.current).toBe(firstValue);
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).not.toBe(firstValue);
    expect(result.current).not.toBe(notValue);
    expect(result.current).toBe(newValue);
  });
});

import { act, renderHook } from "@testing-library/react-hooks";
import { useBoolean } from "../UseBoolean";

describe("useBoolean", () => {
  it("sets initial value", () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current[0]).toBe(false);
  });

  it("sets true for setTrue", () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });

  it("sets true for setFalse", () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current[2]());
    expect(result.current[0]).toBe(false);
  });

  it("toggles for toggle", () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current[3]());
    expect(result.current[0]).toBe(false);
    act(() => result.current[3]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[3]());
    expect(result.current[0]).toBe(false);
  });
});

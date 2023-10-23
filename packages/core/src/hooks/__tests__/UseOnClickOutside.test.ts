import { fireEvent, renderHook } from "@testing-library/react";
import { useRef } from "react";
import { useOnClickOutside } from "../UseOnClickOutside";

describe("useOnClickOutside", () => {
  it("is not called when element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const handler = vi.fn();
    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    fireEvent.mouseDown(button);
    expect(handler).not.toHaveBeenCalled();
  });

  it("is called when other element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const handler = vi.fn();

    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    fireEvent.mouseDown(document);
    expect(handler).toHaveBeenCalled();
  });
});

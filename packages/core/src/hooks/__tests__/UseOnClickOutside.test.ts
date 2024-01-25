import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useOnClickOutside } from "../UseOnClickOutside";
import { vi } from "vitest";

describe("useOnClickOutside", () => {
  const options = {
    altKey: true,
    bubbles: true,
    button: 1,
    cancelable: true,
    ctrlKey: true,
    metaKey: true,
    pointerX: 1,
    pointerY: 1,
    shiftKey: true,
  };

  it("is not called when element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const handler = vi.fn();
    const event = new MouseEvent("mousedown", options);
    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    button.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
  });

  it("is called when other element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const handler = vi.fn();
    const event = new MouseEvent("mousedown", options);
    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    document.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
  });
});

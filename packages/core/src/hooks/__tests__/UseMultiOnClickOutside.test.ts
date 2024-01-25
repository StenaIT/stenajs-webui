import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useMultiOnClickOutside } from "../UseMultiOnClickOutside";
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

  it("is not called when any element is clicked", () => {
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const {
      result: { current: ref2 },
    } = renderHook(() => useRef<EventTarget | null>(button2));
    const handler = vi.fn();
    const event = new MouseEvent("mousedown", options);

    renderHook(() => useMultiOnClickOutside([ref, ref2], handler));
    document.body.appendChild(button);
    document.body.appendChild(button2);
    button.dispatchEvent(event);
    button2.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
  });

  it("is called when other element is clicked", () => {
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    const {
      result: { current: ref },
    } = renderHook(() => useRef<EventTarget | null>(button));
    const {
      result: { current: ref2 },
    } = renderHook(() => useRef<EventTarget | null>(button2));
    const {
      result: { current: nullRef },
    } = renderHook(() => useRef<EventTarget | null>(null));
    const handler = vi.fn();
    const event = new MouseEvent("mousedown", options);
    renderHook(() => useMultiOnClickOutside([ref, ref2, nullRef], handler));
    document.body.appendChild(button);
    document.body.appendChild(button2);
    document.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
  });
});

import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useMultiOnClickOutside } from "../UseMultiOnClickOutside";

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
    shiftKey: true
  };

  it("is not called when any element is clicked", () => {
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    const {
      result: { current: ref }
    } = renderHook(() => useRef<EventTarget | null>(button));
    const {
      result: { current: ref2 }
    } = renderHook(() => useRef<EventTarget | null>(button2));
    const handler = jest.fn();
    const event = document.createEvent("MouseEvent");
    event.initMouseEvent(
      "mousedown",
      options.bubbles,
      options.cancelable,
      document.defaultView!,
      options.button,
      options.pointerX,
      options.pointerY,
      options.pointerX,
      options.pointerY,
      options.ctrlKey,
      options.altKey,
      options.shiftKey,
      options.metaKey,
      options.button,
      null
    );
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
      result: { current: ref }
    } = renderHook(() => useRef<EventTarget | null>(button));
    const {
      result: { current: ref2 }
    } = renderHook(() => useRef<EventTarget | null>(button2));
    const {
      result: { current: nullRef }
    } = renderHook(() => useRef<EventTarget | null>(null));
    const handler = jest.fn();
    const event = document.createEvent("MouseEvent");
    event.initMouseEvent(
      "mousedown",
      options.bubbles,
      options.cancelable,
      document.defaultView!,
      options.button,
      options.pointerX,
      options.pointerY,
      options.pointerX,
      options.pointerY,
      options.ctrlKey,
      options.altKey,
      options.shiftKey,
      options.metaKey,
      options.button,
      null
    );
    renderHook(() => useMultiOnClickOutside([ref, ref2, nullRef], handler));
    document.body.appendChild(button);
    document.body.appendChild(button2);
    document.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
  });
});

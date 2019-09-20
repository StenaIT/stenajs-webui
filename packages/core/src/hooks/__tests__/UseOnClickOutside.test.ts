import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useOnClickOutside } from "../UseOnClickOutside";

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

  it("is not called when element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref }
    } = renderHook(() => useRef<EventTarget | null>(button));
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
    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    button.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
  });

  it("is called when other element is clicked", () => {
    const button = document.createElement("button");
    const {
      result: { current: ref }
    } = renderHook(() => useRef<EventTarget | null>(button));
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
    renderHook(() => useOnClickOutside(ref, handler));
    document.body.appendChild(button);
    document.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
  });
});

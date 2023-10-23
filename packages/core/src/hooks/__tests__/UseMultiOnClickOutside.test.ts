import { renderHook, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import { useMultiOnClickOutside } from "../UseMultiOnClickOutside";

describe("useOnClickOutside", () => {
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

    renderHook(() => useMultiOnClickOutside([ref, ref2], handler));
    document.body.appendChild(button);
    document.body.appendChild(button2);
    fireEvent.mouseDown(button);
    fireEvent.mouseDown(button2);
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

    renderHook(() => useMultiOnClickOutside([ref, ref2, nullRef], handler));
    document.body.appendChild(button);
    document.body.appendChild(button2);
    fireEvent.mouseDown(document);
    expect(handler).toHaveBeenCalled();
  });
});

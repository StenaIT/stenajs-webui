import { renderHook } from "@testing-library/react";
import { addDays } from "date-fns";
import { createDay } from "../../../../util/calendar/CalendarDataFactory";
import { useMultiDateSelection } from "../UseMultiDateSelection";

describe("useMultiDateSelection", () => {
  describe("onClickDay", () => {
    describe("when clicking on a day", () => {
      it("should run onChange", () => {
        const now = new Date();
        const onChange = vi.fn();
        const {
          result: {
            current: { onClickDay },
          },
        } = renderHook(() =>
          useMultiDateSelection({
            value: [],
            onChange,
          })
        );
        onClickDay!(createDay(now), undefined, undefined as any);
        expect(onChange).toBeCalledTimes(1);
      });
    });
    describe("when no date is selected", () => {
      describe("when clicking on a day", () => {
        it("should be added", () => {
          const now = new Date();
          const onChange = vi.fn();
          const {
            result: {
              current: { onClickDay },
            },
          } = renderHook(() =>
            useMultiDateSelection({
              value: [],
              onChange,
            })
          );
          const clickedDay = createDay(now);
          onClickDay!(clickedDay, undefined, undefined as any);
          expect(onChange).toBeCalledWith([now]);
        });
      });
    });
    describe("when a date is selected", () => {
      describe("when clicking on same day", () => {
        it("should be removed", () => {
          const now = new Date();
          const tomorrow = addDays(new Date(), 1);
          const onChange = vi.fn();
          const {
            result: {
              current: { onClickDay },
            },
          } = renderHook(() =>
            useMultiDateSelection({
              value: [now, tomorrow],
              onChange,
            })
          );
          const clickedDay = createDay(now);
          onClickDay!(clickedDay, undefined, undefined as any);
          expect(onChange).toBeCalledWith([tomorrow]);
        });
      });
    });
  });
});

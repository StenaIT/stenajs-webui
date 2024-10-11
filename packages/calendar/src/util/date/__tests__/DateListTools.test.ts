import { addDays } from "date-fns";
import {
  addDateIfNotExists,
  listContainsDate,
  removeDateIfExist,
} from "../DateListTools";

describe("DateListTool", () => {
  const dateList = [new Date(), addDays(new Date(), 2), addDays(new Date(), 7)];

  describe("addDateIfNotExists", () => {
    describe("when date already exists in list", () => {
      it("it should return unmodified list", () => {
        expect(addDateIfNotExists(dateList, new Date()).length).toBe(3);
      });
    });
    describe("when date does not exists in list", () => {
      it("it should return new list with date added", () => {
        expect(
          addDateIfNotExists(dateList, addDays(new Date(), 14)).length,
        ).toBe(4);
      });
    });
  });

  describe("removeDateIfExist", () => {
    describe("when date already exists in list", () => {
      it("it should return a new list with date removed", () => {
        expect(removeDateIfExist(dateList, new Date()).length).toBe(2);
      });
    });
    describe("when date does not exists in list", () => {
      it("it should return unmodified list", () => {
        expect(
          removeDateIfExist(dateList, addDays(new Date(), 14)).length,
        ).toBe(3);
      });
    });
  });

  describe("listContainsDate", () => {
    describe("when date exists in list", () => {
      it("returns true", () => {
        expect(listContainsDate(dateList, new Date())).toBe(true);
      });
    });
    describe("when date does not exists in list", () => {
      it("returns false", () => {
        expect(listContainsDate(dateList, addDays(new Date(), 14))).toBe(false);
      });
    });
  });
});

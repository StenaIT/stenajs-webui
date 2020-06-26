import { createEntityListReducer } from "../entity-list-reducer";
import { createEntityListActions } from "../entity-list-action-creators";

interface User {
  a: string;
  b: string;
}

const stringReducer = createEntityListReducer<string>("s");
const { remove, toggle: toggleString } = createEntityListActions<string>("s");

const reducer = createEntityListReducer<User>("test");
const {
  setList,
  clearList,
  addAtStart,
  addAtEnd,
  removeAtIndex,
  removeLast,
  removeFirst,
  removeByFieldMatch,
  toggle
} = createEntityListActions<User>("test");

describe("entity-list-reducer", () => {
  describe("setList", () => {
    it("replaces old list with new list", () => {
      const r = reducer(
        {
          list: [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
          ]
        },
        setList([{ a: "a3", b: "b3" }])
      );
      expect(r.list.length).toBe(1);
      expect(r.list[0].a).toBe("a3");
    });
  });
  describe("clearList", () => {
    it("clears list to empty", () => {
      const r = reducer(
        {
          list: [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
          ]
        },
        clearList()
      );
      expect(r.list.length).toBe(0);
    });
  });
  describe("addAtStart", () => {
    it("adds entity at end", () => {
      const r = reducer(
        { list: [{ a: "a1", b: "b1" }] },
        addAtStart({ a: "a2", b: "b2" })
      );
      expect(r.list.length).toBe(2);
      expect(r.list[0].a).toBe("a2");
      expect(r.list[1].a).toBe("a1");
    });
  });
  describe("addAtEnd", () => {
    it("adds entity at beginning", () => {
      const r = reducer(
        { list: [{ a: "a1", b: "b1" }] },
        addAtEnd({ a: "a2", b: "b2" })
      );
      expect(r.list.length).toBe(2);
      expect(r.list[0].a).toBe("a1");
      expect(r.list[1].a).toBe("a2");
    });
  });
  describe("removeFirst", () => {
    it("removes first item", () => {
      const r = reducer(
        {
          list: [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
          ]
        },
        removeFirst()
      );
      expect(r.list.length).toBe(1);
      expect(r.list[0].a).toBe("a2");
    });
  });
  describe("removeFirst", () => {
    it("removes last item", () => {
      const r = reducer(
        {
          list: [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
          ]
        },
        removeLast()
      );
      expect(r.list.length).toBe(1);
      expect(r.list[0].a).toBe("a1");
    });
  });
  describe("removeFirst", () => {
    describe("when there are multiple items", () => {
      describe("when index is within limits", () => {
        it("removes item at index", () => {
          const r = reducer(
            {
              list: [
                { a: "a1", b: "b1" },
                { a: "a2", b: "b2" }
              ]
            },
            removeAtIndex(0)
          );
          expect(r.list.length).toBe(1);
          expect(r.list[0].a).toBe("a2");
        });
      });
      describe("when index is too large", () => {
        it("throws exception", () => {
          expect(() => {
            reducer(
              {
                list: [
                  { a: "a1", b: "b1" },
                  { a: "a2", b: "b2" }
                ]
              },
              removeAtIndex(2)
            );
          }).toThrow();
        });
      });
      describe("when index is below 0", () => {
        it("throws exception", () => {
          expect(() => {
            reducer(
              {
                list: [
                  { a: "a1", b: "b1" },
                  { a: "a2", b: "b2" }
                ]
              },
              removeAtIndex(-1)
            );
          }).toThrow();
        });
      });
    });
  });
  describe("removeByFieldMatch", () => {
    describe("when there are multiple items", () => {
      describe("when index is within limits", () => {
        it("removes item at index", () => {
          const r = reducer(
            {
              list: [
                { a: "a1", b: "b1" },
                { a: "a2", b: "b2" }
              ]
            },
            removeByFieldMatch({ a: "a1" })
          );
          expect(r.list.length).toBe(1);
          expect(r.list[0].a).toBe("a2");
        });
      });
    });
  });
  describe("remove", () => {
    describe("when there are multiple items", () => {
      describe("when index is within limits", () => {
        it("removes item at index", () => {
          const r = stringReducer(
            {
              list: ["abc", "efg"]
            },
            remove("efg")
          );
          expect(r.list.length).toBe(1);
          expect(r.list[0]).toBe("abc");
        });
      });
    });
  });
  describe("toggle", () => {
    describe("when entity type is string", () => {
      describe("when item exists", () => {
        it("removes it", () => {
          const r = stringReducer(
            {
              list: ["abc", "efg"]
            },
            toggleString("efg")
          );
          expect(r.list.length).toBe(1);
          expect(r.list[0]).toBe("abc");
        });
      });
      describe("when item does not exists", () => {
        it("removes it", () => {
          const r = stringReducer(
            {
              list: ["abc", "efg"]
            },
            toggleString("xyz")
          );
          expect(r.list.length).toBe(3);
          expect(r.list[0]).toBe("abc");
          expect(r.list[1]).toBe("efg");
          expect(r.list[2]).toBe("xyz");
        });
      });
    });
    describe("when entity type is object", () => {
      describe("when item exists", () => {
        it("removes it", () => {
          const r = reducer(
            {
              list: [
                { a: "a1", b: "b1" },
                { a: "a2", b: "b2" }
              ]
            },
            toggle({ a: "a2", b: "b2" })
          );
          expect(r.list.length).toBe(1);
          expect(r.list[0].a).toBe("a1");
        });
      });
      describe("when item does not exists", () => {
        it("removes it", () => {
          const r = reducer(
            {
              list: [
                { a: "a1", b: "b1" },
                { a: "a2", b: "b2" }
              ]
            },
            toggle({ a: "a3", b: "b3" })
          );
          expect(r.list.length).toBe(3);
          expect(r.list[0].a).toBe("a1");
          expect(r.list[1].a).toBe("a2");
          expect(r.list[2].a).toBe("a3");
        });
      });
    });
  });
});

import { EntityWithId } from "../../../../common/EntityWithId";
import { createEntityByIdActions } from "../entity-by-id-action-creators";
import { createEntityByIdReducer } from "../entity-by-id-reducer";

interface Entity extends EntityWithId {
  id: string;
  username: string;
  password?: string;
}

describe("entity-by-id-reducer", () => {
  const reduce = createEntityByIdReducer<Entity>();
  const actions = createEntityByIdActions<Entity>();

  describe("setEntity", () => {
    describe("when entity does not exist", () => {
      it("adds the entity", () => {
        const s = reduce(
          { entities: {} },
          actions.setEntity({ id: "1", username: "lala" }),
        );
        expect(s.entities["1"]).toBeDefined();
        expect(s.entities["1"].username).toBe("lala");
      });
    });
    describe("when entity already exists", () => {
      it("overwrites the entity", () => {
        const s = reduce(
          {
            entities: {
              "1": { id: "1", username: "lolo", password: "123" },
            },
          },
          actions.setEntity({ id: "1", username: "lala" }),
        );
        expect(s.entities["1"].username).toBe("lala");
        expect(s.entities["1"].password).toBeUndefined();
      });
    });
  });
  describe("setEntityFields", () => {
    describe("when entity does not exist", () => {
      it("adds the entity", () => {
        const s = reduce(
          { entities: {} },
          actions.setEntityFields("1", { id: "1", username: "lala" }),
        );
        expect(s.entities["1"]).toBeDefined();
        expect(s.entities["1"].username).toBe("lala");
      });
    });
    describe("when entity already exists", () => {
      it("it merges the the new entity into the old entity", () => {
        const s = reduce(
          {
            entities: {
              "1": { id: "1", username: "lolo", password: "123" },
            },
          },
          actions.setEntityFields("1", { id: "1", username: "lala" }),
        );
        expect(s.entities["1"].username).toBe("lala");
        expect(s.entities["1"].password).toBe("123");
      });
    });
  });
  describe("clearAllEntities", () => {
    describe("when entity does not exist", () => {
      it("does nothing", () => {
        const state = { entities: {} };
        const s = reduce(state, actions.clearAllEntities());
        expect(s).toStrictEqual(state);
      });
    });
    describe("when there are entities", () => {
      it("it deletes all entities", () => {
        const s = reduce(
          {
            entities: {
              "1": { id: "1", username: "lolo", password: "123" },
            },
          },
          actions.clearAllEntities(),
        );
        expect(Object.keys(s.entities).length).toBe(0);
      });
    });
  });

  describe("clearEntity", () => {
    describe("when entity does not exist", () => {
      it("does nothing", () => {
        const s = reduce(
          {
            entities: {
              "1": { id: "1", username: "lolo", password: "123" },
            },
          },
          actions.clearEntity("2"),
        );
        expect(Object.keys(s.entities).length).toBe(1);
      });
    });
    describe("when entity exists", () => {
      it("it deletes the entity", () => {
        const s = reduce(
          {
            entities: {
              "1": { id: "1", username: "lolo", password: "123" },
            },
          },
          actions.clearEntity("1"),
        );
        expect(s.entities["1"]).toBeUndefined();
      });
    });
  });
});

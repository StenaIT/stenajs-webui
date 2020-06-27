import { createSingleEntityActions } from "../single-entity-actions";
import { createSingleEntityReducer } from "../single-entity-reducer";

interface Entity {
  username: string;
  email?: string;
}

describe("single-entity-reducer", () => {
  const reduce = createSingleEntityReducer<Entity>({ username: "mat" });
  const actions = createSingleEntityActions<Entity>();

  describe("setEntity", () => {
    it("overwrites the entity", () => {
      const s = reduce(
        {
          entity: { username: "lolo", email: "hejsan" }
        },
        actions.setEntity({ username: "lala" })
      );
      expect(s.entity.username).toBe("lala");
      expect(s.entity.email).toBeUndefined();
    });
  });
  describe("setEntityFields", () => {
    it("it merges the the new entity into the old entity", () => {
      const s = reduce(
        {
          entity: { username: "lolo", email: "hejsan" }
        },
        actions.setEntityFields({ username: "lala" })
      );
      expect(s.entity.username).toBe("lala");
      expect(s.entity.email).toBe("hejsan");
    });
  });
});

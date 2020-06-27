import { createEntityActions } from "../entity-actions";
import { createEntityReducer } from "../entity-reducer";

interface Entity {
  username: string;
  email?: string;
}

describe("entity-reducer", () => {
  const reduce = createEntityReducer<Entity>({ username: "mat" });
  const actions = createEntityActions<Entity>();

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

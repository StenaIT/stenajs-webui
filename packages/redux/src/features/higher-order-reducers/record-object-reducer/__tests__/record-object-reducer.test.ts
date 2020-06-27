import {
  recordObjectAction,
  recordObjectReducer
} from "../record-object-reducer";
import { createEntityReducer } from "../../../reducer-factories/entity-reducer/entity-reducer";
import { createEntityActions } from "../../../reducer-factories/entity-reducer/entity-actions";

type Entity = {
  id: string;
  email: string;
};

describe("record-object-reducer", () => {
  describe("recordObjectReducer", () => {
    it("runs the reducer on a field on the record", () => {
      const actions = createEntityActions<Entity>();
      const reducer = recordObjectReducer(
        createEntityReducer<Entity>({ id: "", email: "" })
      );

      const r = reducer(
        {},
        recordObjectAction(
          "id1",
          actions.setEntity({ id: "id1", email: "johan" })
        )
      );

      expect(r.id1.entity.email).toBe("johan");
    });
  });
});

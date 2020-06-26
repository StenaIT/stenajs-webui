import { recordObjectReducer } from "../record-object-reducer";
import { createEntityReducer } from "../../../reducer-factories/entity-reducer/entity-reducer";

describe("record-object-reducer", () => {
  describe("recordObjectReducer", () => {
    it("runs the reducer on a field on the record", () => {
      const reducer = recordObjectReducer(
        createEntityReducer<{
          id: string;
          email: string;
        }>("test", { id: "", email: "" })
      );

      const r = reducer(
        {},
        {
          recordId: "id1",
          action: {
            type: "ENTITY:SET_ENTITY",
            reducerId: "test",
            entity: { id: "id1", email: "johan" }
          }
        }
      );

      expect(r.id1.entity.email).toBe("johan");
    });
  });
});

import {
  createEntityReducer,
  EntityState
} from "../../../reducer-factories/entity-reducer/entity-reducer";
import { createEntityActions } from "../../../reducer-factories/entity-reducer/entity-action-creators";
import {
  createRecordObjectReducer,
  RecordObjectState
} from "../record-object-reducer";
import { createRecordObjectActions } from "../record-object-action-creators";
import { EntityAction } from "../../../reducer-factories/entity-reducer/entity-actions";

type TestUser = {
  id: string;
  email: string;
};

const innerActions = createEntityActions<TestUser>();
const innerReducer = createEntityReducer<TestUser>({
  id: "",
  email: ""
});
const actions = createRecordObjectActions<EntityAction<TestUser>>();
const reducer = createRecordObjectReducer(innerReducer);

describe("record-object-reducer", () => {
  describe("recordObjectReducer", () => {
    describe("pass actions to inner reducer", () => {
      it("runs the reducer on a field on the record", () => {
        const r = reducer(
          {},
          actions.recordAction(
            "id1",
            innerActions.setEntity({ id: "id1", email: "johan" })
          )
        );

        expect(r.id1.entity.email).toBe("johan");
      });
    });
    describe("clearRecord", () => {
      it("removes the specified record", () => {
        const r = reducer(
          {},
          actions.recordAction(
            "id1",
            innerActions.setEntity({ id: "id1", email: "johan" })
          )
        );

        expect(r.id1.entity.email).toBe("johan");

        const s = reducer(r, actions.clearRecord("id1"));
        expect(s.id1).toBe(undefined);
      });
    });
    describe("clearAllRecords", () => {
      it("removes the specified record", () => {
        let r: RecordObjectState<EntityState<TestUser>> = {};
        r = reducer(
          r,
          actions.recordAction(
            "id1",
            innerActions.setEntity({ id: "id1", email: "johan" })
          )
        );
        r = reducer(
          r,
          actions.recordAction(
            "id2",
            innerActions.setEntity({ id: "id2", email: "mattias" })
          )
        );
        expect(Object.keys(r).length).toBe(2);
        expect(r.id1.entity.email).toBe("johan");
        r = reducer(r, actions.clearAllRecords());
        expect(Object.keys(r).length).toBe(0);
      });
    });
  });
});

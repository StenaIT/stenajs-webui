import { reducerIdGate, reducerIdGateAction } from "../reducer-id-gate";

describe("reducer-id-gate", () => {
  describe("reducerIdGate", () => {
    describe("if id matches", () => {
      it("runs the specified reducer", () => {
        const innerReducer = () => "hello";
        const reducer = reducerIdGate("test", innerReducer);
        const r = reducer("", reducerIdGateAction("test", {}));
        expect(r).toBe("hello");
      });
    });
    describe("if id does not match", () => {
      it("does not run the specified reducer", () => {
        const innerReducer = () => "hello";
        const reducer = reducerIdGate("test", innerReducer);
        const r = reducer("", reducerIdGateAction("notTest", {}));
        expect(r === "hello").toBe(false);
      });
    });
  });
});

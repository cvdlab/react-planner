/* global describe, it, expect */
import reducer from "../../../src/reducers/reducer";
import { MODES } from "../../../src/constants";

describe("app reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      content: "VIEWER_2D_CONTENT",
      mode: MODES.MODE_IDLE,
      viewer2D: { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 }
    });
  });
});

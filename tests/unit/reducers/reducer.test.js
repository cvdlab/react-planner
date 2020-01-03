/* global describe, it, expect */
import reducer from "../../../src/reducers/reducer";

describe("app reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      content: "VIEWER_2D_CONTENT"
    });
  });
});

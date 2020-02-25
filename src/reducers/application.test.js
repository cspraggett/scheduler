import React from "react";

import reducer from "./application";

describe("Application Reducer", () => {
  it("throws an err with an unsupported type", () => {
    expect(() => reducer({}, {type: null})).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});

import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("renders learn react link", () => {
  it("Renders link to Google", () => {
    const app = shallow(<App size={2} />);
    expect(app).toMatchSnapshot();
  });
});

import {
  generateColorMatrix,
  isEqual,
  getBlockColor,
  swapBlock,
  stringToPosition,
} from "./utils";

describe("generateColorMatrix", () => {
  it("return correct output", () => {
    expect(generateColorMatrix(2, [20, 20])).toMatchSnapshot();
  });
});

describe("isEqual", () => {
  it("should return true when two tuples are the same", () => {
    expect(isEqual([5, 9], [5, 9])).toMatchSnapshot();
  });
  it("should return false when two tuples are different", () => {
    expect(isEqual([5, 9], [-5, 9])).toMatchSnapshot();
  });
});

describe("getBlockColor", () => {
  it("return correct color tuple", () => {
    expect(
      getBlockColor(
        [[{ color: [1, 2, 3], position: [0, 0] }]],
        [0, 0],
        [-1, -1, -1]
      )
    ).toMatchSnapshot();
  });
});

describe("swapBlock", () => {
  it("return correct board after swapping", () => {
    expect(
      swapBlock(
        [
          [{ color: [1, 2, 3], position: [1, 1] }],
          [{ color: [4, 5, 6], position: [1, 1] }],
        ],
        [0, 0],
        [1, 0]
      )
    ).toMatchSnapshot();
  });
  it("return correct board if passing invalid position", () => {
    expect(
      swapBlock(
        [
          [{ color: [1, 2, 3], position: [1, 1] }],
          [{ color: [4, 5, 6], position: [1, 1] }],
        ],
        [0, 0],
        [-1, -1]
      )
    ).toMatchSnapshot();
  });
});

describe("stringToPosition", () => {
  it("return correct output", () => {
    expect(stringToPosition("2,6")).toMatchSnapshot();
    expect(stringToPosition("6")).toMatchSnapshot();
    expect(stringToPosition("6,3,5")).toMatchSnapshot();
    expect(stringToPosition(",,,23")).toMatchSnapshot();
  });
});

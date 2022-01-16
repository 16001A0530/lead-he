import { returnMessage, message } from "../src";

describe("Pratice Test Suite", () => {
  it('Returns "Hello world!"', () => {
    expect(returnMessage(message)).toEqual(message);
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe("Pratice Test Suite", () => {
    it('Returns "Hello world!"', () => {
        expect((0, src_1.returnMessage)(src_1.message)).toEqual(src_1.message);
    });
});

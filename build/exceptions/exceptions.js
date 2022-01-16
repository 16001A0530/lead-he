"use strict";
class ExceptionAxiosGetData extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ExceptionAxiosGetData.prototype);
    }
    getMessage() {
        return "hello " + this.message;
    }
}

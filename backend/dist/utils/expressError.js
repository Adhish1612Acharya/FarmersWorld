"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class expressError extends Error {
    constructor(status, errMsg) {
        super();
        this.status = status;
        this.errMsg = errMsg;
    }
}
exports.default = expressError;

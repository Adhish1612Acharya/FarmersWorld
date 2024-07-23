"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log("error middleware");
        const statusNumber = err.status || 500;
        const Msg = err.errMsg;
        console.log(`${statusNumber} , ${Msg}`);
        res.status(statusNumber);
    }
    else {
        next();
    }
};
exports.default = errorHandler;

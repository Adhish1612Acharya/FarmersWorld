"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.checkLogin = void 0;
const checkLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("notLogin");
});
exports.checkLogin = checkLogin;
const logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            res.json("Some error occured");
        }
        else {
            console.log("loggedOut");
            res.send("loggedOut");
        }
    });
};
exports.logout = logout;
exports.default = {
    checkLogin: exports.checkLogin,
    logout: exports.logout,
};

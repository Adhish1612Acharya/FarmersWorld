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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./data"));
const Scheme_1 = __importDefault(require("../models/Scheme"));
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = "mongodb://127.0.0.1:27017/farmersworld";
main()
    .then(() => {
    console.log(DB_URL);
    console.log("DB CONNECTED");
})
    .catch((err) => {
    console.log(err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(DB_URL);
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Scheme_1.default.deleteMany({}).then(() => console.log("deleted"));
        let scheme = yield Scheme_1.default.insertMany(data_1.default)
            .then(() => {
            console.log("Data inserted");
        })
            .catch((err) => console.log(err));
    });
}
insertData();

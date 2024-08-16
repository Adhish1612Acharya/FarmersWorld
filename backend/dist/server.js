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
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_1.config)();
}
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./types/errorHandler"));
const path_1 = __importDefault(require("path"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Farmers_1 = __importDefault(require("./models/Farmers"));
const Admin_1 = __importDefault(require("./models/Admin"));
const schemes_1 = __importDefault(require("./routes/schemes"));
const farmers_1 = __importDefault(require("./routes/farmers"));
const admin_1 = __importDefault(require("./routes/admin"));
const common_1 = __importDefault(require("./routes/common"));
const DB_URL = process.env.DB_PORT || "mongodb://127.0.0.1:27017/farmersworld";
main()
    .then(() => {
    console.log("DB connected", DB_URL);
})
    .catch((err) => {
    console.log(err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(DB_URL);
    });
}
const store = connect_mongo_1.default.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET || "My secret code",
    },
    touchAfter: 24 * 3600,
});
store.on("error", (err) => {
    console.log("Error occured in mongo session store", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET || "MySecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)(sessionOptions));
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use("farmer", new passport_local_1.Strategy(Farmers_1.default.authenticate()));
passport_1.default.use("admin", new passport_local_1.Strategy(Admin_1.default.authenticate()));
passport_1.default.serializeUser((entity, done) => {
    done(null, { id: entity._id, type: entity.role });
});
passport_1.default.deserializeUser((obj, done) => {
    switch (obj.type) {
        case "farmer":
            Farmers_1.default.findById(obj.id).then((user) => {
                if (user) {
                    done(null, user);
                }
                else {
                    done(new Error("user id not found:" + obj.id));
                }
            });
            break;
        case "admin":
            Admin_1.default.findById(obj.id).then((retailer) => {
                if (retailer) {
                    done(null, retailer);
                }
                else {
                    done(new Error("retailer id not found:" + obj.id));
                }
            });
            break;
        default:
            done(new Error("no entity type:" + obj.type));
            break;
    }
});
app.use("/api/schemes", schemes_1.default); //schemes route
app.use("/api/farmers", farmers_1.default); //auth and authori route for farmers
app.use("/api/admin", admin_1.default); //admin route
app.use("/api", common_1.default); // route to check login for auth page along with logout
// -------------------Deployment------------------//
const __dirname1 = path_1.default.resolve();
if (process.env.NODE_ENV === "local") {
    app.use(express_1.default.static(path_1.default.join(__dirname1, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname1, "frontend", "dist", "index.html"));
    });
}
else {
    app.get("/", (req, res) => {
        res.json("Success");
    });
}
// -------------------Deployment------------------//
app.use(errorHandler_1.default);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});

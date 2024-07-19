import { config as dotEnvConfig } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotEnvConfig();
}

import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import cors from "cors";
import errorHandler from "./types/errorHandler";

import Farmer from "./models/Farmers";
import Admin from "./models/Admin";

import schemesRouter from "./routes/schemes";
import farmerRouter from "./routes/farmers";
import adminRouter from "./routes/admin";
import wrapAsync from "./utils/wrapAsync";
import commonRouter from "./routes/common";

import loginCheckController from "./controllers/common";

const port = 8080;

const DBPort = "mongodb://127.0.0.1:27017/farmersworld";

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DBPort);
}

const sessionOptions = {
  secret: "MySecretKey",
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

app.use(bodyParser.json());
app.use(session(sessionOptions));

// const corsOptions = {
//   origin: ["http://localhost:5173"],
//   methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use("farmer", new localStrategy(Farmer.authenticate()));
passport.use("admin", new localStrategy(Admin.authenticate()));

passport.serializeUser(
  (
    entity: any,
    done: (err: any, id?: { id: string; type: string }) => void
  ) => {
    done(null, { id: entity._id, type: entity.role });
  }
);

passport.deserializeUser(
  (obj: { id: string; type: string }, done: (err: any, user?: any) => void) => {
    switch (obj.type) {
      case "farmer":
        Farmer.findById(obj.id).then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(new Error("user id not found:" + obj.id));
          }
        });
        break;
      case "admin":
        Admin.findById(obj.id).then((retailer) => {
          if (retailer) {
            done(null, retailer);
          } else {
            done(new Error("retailer id not found:" + obj.id));
          }
        });
        break;
      default:
        done(new Error("no entity type:" + obj.type));
        break;
    }
  }
);

app.use("/api/schemes", schemesRouter); //schemes route
app.use("/api/farmers", farmerRouter); //auth and authori route for farmers
app.use("/api/admin", adminRouter); //admin route
app.use("/api", commonRouter); // route to check login for auth page along with logout

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

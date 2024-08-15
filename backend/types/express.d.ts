import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    mdata?: {
      login: boolean;
    };
    file: any;
  }
}

export interface Req {
  mdata?: {
    login: boolean;
  };
  file: any;
}

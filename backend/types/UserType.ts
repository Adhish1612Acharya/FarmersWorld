import { farmersDocument } from "../models/Farmers";
import { adminDocument } from "../models/Admin";

declare global {
  namespace Express {
    interface User extends adminDocument {}
  }
}

export interface User {
  _id: string;
  role: string;
}

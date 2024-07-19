import { Request, Response } from "express";

export const checkLogin = async (req: Request, res: Response) => {
  res.json("notLogin");
};

export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      res.json("Some error occured");
    } else {
      console.log("loggedOut");
      res.send("loggedOut");
    }
  });
};

export default {
  checkLogin,
  logout,
};

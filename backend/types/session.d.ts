import "express-session";

declare module "express-session" {
  interface Session {
    redirect?: string | undefined;
  }
}

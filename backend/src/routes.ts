import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.post("/signup", new UserController().signup);
routes.post("/login", new UserController().login);
routes.post("/logout", new UserController().logout);
routes.get("/profile", new UserController().profile);

export default routes;

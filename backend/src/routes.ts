import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ProjectController } from "./controllers/ProjectController";

const routes = Router();

routes.post("/signup", new UserController().signup);
routes.post("/login", new UserController().login);
routes.post("/logout", new UserController().logout);
routes.get("/profile", new UserController().profile);

routes.post("/project", new ProjectController().create);
routes.get("/projects", new ProjectController().findAll);

export default routes;

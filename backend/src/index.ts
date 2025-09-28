import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import "dotenv/config";
import "reflect-metadata";
import cookieParser from "cookie-parser";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(cookieParser());

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(routes);

  return app.listen(process.env.PORT);
});

import { Request, Response } from "express";

export class SubjectController {
  async create(req: Request, res: Response) {
    return res.json("Funcionando");
  }
}

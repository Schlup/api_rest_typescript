import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Subject } from "../entities/Subject";
import { subjectRepository } from "../repositories/subjectRespository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O nome é obrigatório." });
    }

    try {
      const newSubject = subjectRepository.create({ name });

      await subjectRepository.save(newSubject);

      return res.status(201).json(newSubject);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

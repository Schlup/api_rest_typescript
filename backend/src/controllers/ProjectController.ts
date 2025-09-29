import { validate } from "class-validator";
import { CreateProjectDto } from "../dtos/project/CreateProjectDTO";
import { UpdateProjectDto } from "../dtos/project/UpdateProjectDTO";
import { ProjectService } from "../services/ProjectService";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const createDto = plainToInstance(CreateProjectDto, req.body);
      const errors = await validate(createDto);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const newProject = await this.projectService.create(createDto);
      return res.status(201).json(newProject);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: errorMessage });
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const projects = await this.projectService.findAll();
      return res.status(200).json(projects);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: errorMessage });
    }
  };

  findOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const project = await this.projectService.findOne(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json(project);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: errorMessage });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const updateDto = plainToInstance(UpdateProjectDto, req.body);
      const errors = await validate(updateDto);

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const updatedProject = await this.projectService.update(id, updateDto);
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json(updatedProject);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: errorMessage });
    }
  };

  remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.projectService.remove(id);
      return res.status(204).send();
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return res
        .status(500)
        .json({ message: "Internal server error", error: errorMessage });
    }
  };
}

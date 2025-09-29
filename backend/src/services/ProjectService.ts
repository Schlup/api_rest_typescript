import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
import { FormTemplate } from "../entities/FormTemplate";
import { CreateProjectDto } from "../dtos/project/CreateProjectDTO";
import { UpdateProjectDto } from "../dtos/project/UpdateProjectDTO";

export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project);
  private userRepository = AppDataSource.getRepository(User);
  private formTemplateRepository = AppDataSource.getRepository(FormTemplate);

  async create(createDto: CreateProjectDto): Promise<Project> {
    const { userIds, formTemplateIds, ...projectData } = createDto;

    const newProject = this.projectRepository.create(projectData);

    // Associa usuários existentes ao projeto, se IDs forem fornecidos
    if (userIds && userIds.length > 0) {
      const users = await this.userRepository.findByIds(userIds);
      newProject.users = users;
    }

    // Associa templates existentes ao projeto, se IDs forem fornecidos
    if (formTemplateIds && formTemplateIds.length > 0) {
      const templates = await this.formTemplateRepository.findByIds(
        formTemplateIds
      );
      newProject.formTemplates = templates;
    }

    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    // Retorna projetos com suas relações de usuários e templates
    return this.projectRepository.find({
      relations: ["users", "formTemplates", "reports"],
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ["users", "formTemplates", "reports"],
    });
  }

  async update(
    id: string,
    updateDto: UpdateProjectDto
  ): Promise<Project | null> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      return null; // Ou lançar um erro
    }

    const { userIds, formTemplateIds, ...projectData } = updateDto;

    // Atualiza os campos simples
    this.projectRepository.merge(project, projectData);

    // Atualiza as relações se os arrays forem fornecidos
    if (userIds) {
      const users = await this.userRepository.findByIds(userIds);
      project.users = users;
    }

    if (formTemplateIds) {
      const templates = await this.formTemplateRepository.findByIds(
        formTemplateIds
      );
      project.formTemplates = templates;
    }

    return this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Project not found");
    }
  }
}

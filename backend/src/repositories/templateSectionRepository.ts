import { AppDataSource } from "../data-source";
import { TemplateSection } from "../entities/TemplateSection";

export const templateSectionRepository =
  AppDataSource.getRepository(TemplateSection);

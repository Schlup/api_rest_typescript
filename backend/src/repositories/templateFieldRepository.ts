import { AppDataSource } from "../data-source";
import { TemplateField } from "../entities/TemplateField";

export const templateFieldRepository =
  AppDataSource.getRepository(TemplateField);

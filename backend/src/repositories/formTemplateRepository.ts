import { AppDataSource } from "../data-source";
import { FormTemplate } from "../entities/FormTemplate";

export const formTemplateRepository = AppDataSource.getRepository(FormTemplate);

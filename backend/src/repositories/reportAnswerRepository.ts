import { AppDataSource } from "../data-source";
import { ReportAnswer } from "../entities/ReportAnswer";

export const reportAnswerRepository = AppDataSource.getRepository(ReportAnswer);

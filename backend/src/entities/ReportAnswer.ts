import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Report } from "./Report";
import { TemplateField } from "./TemplateField";

@Entity("report_answers")
export class ReportAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report, (report) => report.answers)
  @JoinColumn({ name: "report_id" })
  report: Report;

  @ManyToOne(() => TemplateField)
  @JoinColumn({ name: "template_field_id" })
  templateField: TemplateField;

  @Column({ type: "text" })
  value: string;
}

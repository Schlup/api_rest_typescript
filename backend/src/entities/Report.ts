import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { ReportAnswer } from "./ReportAnswer";
import { User } from "./User";
import { Project } from "./Project";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => FormTemplate)
  @JoinColumn({ name: "form_template_id" })
  formTemplate: FormTemplate;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Project, (project) => project.reports)
  @JoinColumn({ name: "project_id" })
  project: Project;

  @Column({ default: "PENDING_APPROVAL" })
  status: string;

  @OneToMany(() => ReportAnswer, (answer) => answer.report, { cascade: true })
  answers: ReportAnswer[];

  @CreateDateColumn({ name: "submitted_at" })
  submittedAt: Date;

  @Column({ name: "approved_at", type: "timestamp", nullable: true })
  approvedAt: Date;
}

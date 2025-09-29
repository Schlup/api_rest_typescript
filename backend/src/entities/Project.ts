import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Report } from "./Report";
import { User } from "./User";
import { FormTemplate } from "./FormTemplate";

export enum ProjectStatus {
  PLANEJAMENTO = "planning",
  EM_ANDAMENTO = "in_progress",
  CONCLUIDO = "completed",
  EM_ESPERA = "on_hold",
  CANCELADO = "canceled",
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string; // Ex: "Expansão Fábrica Klabin"

  @Column({ unique: true, name: "project_code" })
  projectCode: string; // Ex: "WEG-2025-0123"

  @Column({ name: "client_name" })
  clientName: string; // Ex: "Klabin S.A."

  @Column()
  location: string; // Ex: "Ortigueira, PR"

  @Column({
    type: "enum",
    enum: ProjectStatus,
    default: ProjectStatus.PLANEJAMENTO,
  })
  status: ProjectStatus;

  @Column({ type: "date", name: "start_date", nullable: true })
  startDate: Date;

  @Column({ type: "date", name: "end_date", nullable: true })
  endDate: Date;

  // Um Projeto tem muitos Relatórios
  @OneToMany(() => Report, (report) => report.project)
  reports: Report[];

  // Um Projeto tem muitos Usuários (técnicos, gerentes),
  // e um Usuário pode estar em muitos Projetos.
  // Relação Muitos-para-Muitos (N:N)
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: "projects_users", // nome da tabela pivo que será criada
    joinColumn: { name: "project_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
  })
  users: User[];

  @ManyToMany(() => FormTemplate)
  @JoinTable({
    name: "projects_templates", // Nome da tabela pivo
    joinColumn: { name: "project_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "form_template_id", referencedColumnName: "id" },
  })
  formTemplates: FormTemplate[]; // Lista de formulários associados a este projeto

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

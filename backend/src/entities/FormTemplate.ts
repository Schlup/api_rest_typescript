import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { TemplateSection } from "./TemplateSection";
import { Project } from "./Project";

@Entity("form_templates")
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: 1 })
  version: number;

  @OneToMany(() => TemplateSection, (section) => section.formTemplate, {
    cascade: true, // Se um template for deletado, suas seções também serão.
  })
  sections: TemplateSection[];

  @ManyToMany(() => Project, (project) => project.formTemplates)
  projects: Project[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

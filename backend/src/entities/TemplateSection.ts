import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { TemplateField } from "./TemplateField";

@Entity("template_sections")
export class TemplateSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "integer" })
  order: number;

  @ManyToOne(() => FormTemplate, (template) => template.sections)
  @JoinColumn({ name: "form_template_id" })
  formTemplate: FormTemplate;

  @OneToMany(() => TemplateField, (field) => field.templateSection, {
    cascade: true,
  })
  fields: TemplateField[];
}

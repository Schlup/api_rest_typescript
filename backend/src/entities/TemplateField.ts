import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TemplateSection } from "./TemplateSection";

@Entity("template_fields")
export class TemplateField {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TemplateSection, (section) => section.fields)
  @JoinColumn({ name: "template_section_id" })
  templateSection: TemplateSection;

  @Column()
  label: string;

  @Column({ name: "field_type" })
  fieldType: string; // Ex: 'text', 'number', 'date', 'select', 'photo_upload'

  @Column({ type: "jsonb", nullable: true })
  options: any; // Para 'select' ou 'radio', ex: ['Conforme', 'Não Conforme']

  @Column({ nullable: true })
  unit: string; // Ex: 'V', 'A', '°C'

  @Column({ name: "is_required", default: false })
  isRequired: boolean;

  @Column({ type: "integer" })
  order: number;
}

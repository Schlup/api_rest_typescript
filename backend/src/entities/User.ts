import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./Project";

export enum UserRole {
  ADMIN = "admin",
  GERENTE_PROJETOS = "project_manager",
  SUPERVISOR_CAMPO = "field_supervisor",
  TECNICO_CAMPO = "field_technician",
  USER = "read_only", // convidado 
}

@Entity("users") // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", unique: true, nullable: false })
  email: string;

  @Column({ type: "text", nullable: false })
  password: string;
  // Armazenará o HASH da senha, nunca a senha pura

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.TECNICO_CAMPO,
  })
  role: UserRole;

  @Column({ type: "boolean", default: true })
  isActive: boolean;
  // Ao invés de deletar o usuário do banco de dados, é só deixar ele desativado.

  @CreateDateColumn()
  createdAt: Date;
  // Data de criação (gerenciada automaticamente pelo TypeORM)

  @UpdateDateColumn()
  updatedAt: Date;
  // Data da última atualização (gerenciada automaticamente)

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];
}

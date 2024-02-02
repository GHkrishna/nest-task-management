import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // Many to One relation to 'User'
  // user
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // Using a custom interceptor defined at root, 'transform.inerceptor.ts'
  // The @Exclude decorator excludes the User data to be returned in plain format
  // Since the transform interceptor only returs reponses in plain format, the user field is excluded from all global response
  // But even though it is not returned to client, it is stored in the Execution context 
  @Exclude({ toPlainOnly: true })
  user: User;
}

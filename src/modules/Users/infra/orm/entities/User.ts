import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../../../domain/models/IUser';
import { Task } from '../../../../Tasks/infra/orm/entities/Task';

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column()
    email: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

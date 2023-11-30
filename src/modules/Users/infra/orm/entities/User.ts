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

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
    tasks: Task[];

    @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: 'now()' })
    updated_at: Date;
}

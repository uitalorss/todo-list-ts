import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../../domain/models/IUser';
import { Task } from '../../../../tasks/infra/orm/entities/Task';

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    @Exclude()
    password: string;

    @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
    tasks: Task[];

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ITask } from '../../../domain/models/ITask';
import { User } from '../../../../users/infra/orm/entities/User';

@Entity('tasks')
export class Task implements ITask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: 'now()' })
    updated_at: Date;
}

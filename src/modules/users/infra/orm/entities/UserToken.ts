import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_token')
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    @Generated('uuid')
    token: string;
    @Column()
    user_id: string;
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
}

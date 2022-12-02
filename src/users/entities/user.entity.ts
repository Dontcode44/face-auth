import { Profiles } from 'src/profiles/entities/profiles.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 40 })
  @Index('idx_email')
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'uuid', unique: true, name: 'activation_token' })
  activationToken: string;

  @OneToOne(() => Profiles, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: Profiles;

  @CreateDateColumn({ name: 'createdAt' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updated_at: Date;
}

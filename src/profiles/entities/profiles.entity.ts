import { IsAlpha } from 'class-validator';
import { Friends } from 'src/friends/entities/friends.entity';
import { Messenger } from 'src/messenger/entities/messenger.entity';
import { Publications } from 'src/publications/entities/publications.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsAlpha()
  name: string;

  @Column()
  @IsAlpha()
  lastname: string;

  @Column({ type: 'timestamp' })
  birthdate: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Publications, (publication) => publication.author)
  publications: Publications[];

  @OneToOne(() => Messenger, (messenger) => messenger.profile)
  @JoinColumn({ name: 'messenger_id' })
  messenger: Messenger;

  @OneToMany(() => Friends, (friends) => friends.currentProfile)
  friends: Friends[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

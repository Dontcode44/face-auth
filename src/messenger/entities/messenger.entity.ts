import { Chats } from 'src/chats/entities/chats.entity';
import { Profiles } from 'src/profiles/entities/profiles.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Messenger {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column({ type: 'simple-array' })
  chats: string[];

  @OneToOne(() => Profiles, (profile) => profile.messenger)
  profile: Profiles;

  @ManyToOne(() => Chats, (chats) => chats.messenger)
  conversations: Chats;
}

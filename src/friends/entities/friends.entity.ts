import { Profiles } from "src/profiles/entities/profiles.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'all_friends', type: 'simple-array' })
  allFriends: string[];

  @Column({ name: 'pending_friends', type: 'simple-array' })
  pendingFriends: string[];

  @Column({ name: 'friend_requests', type: 'simple-array' })
  friendRequests: string[];

  @ManyToOne(() => Profiles, (profile) => profile.friends)
  currentProfile: Profiles;
}
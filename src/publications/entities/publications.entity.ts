import { Profiles } from "src/profiles/entities/profiles.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publications {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Index({})
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Profiles, (profile) => profile.publications)
  author: Profiles;

  @Column({ type: 'simple-array' })
  privacity: string[];
}

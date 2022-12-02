import { Profiles } from "src/profiles/entities/profiles.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'publication',
})
export class Publications {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Index('idx_title')
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Profiles, (profile) => profile.publications)
  @Index('idx_author')
  author: Profiles;

  /* Creating a column in the database that is an array of strings that
  would be Public, Private, or Friends.
  */
  @Column({ type: 'simple-array' })
  privacity: string[];
}

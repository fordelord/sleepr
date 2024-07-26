import { Column, Entity, ManyToMany } from 'typeorm';
import { Role } from '@app/common/models/role.entity';
import { JoinTable } from 'typeorm';
import { AbstractEntity } from '@app/common/database';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}

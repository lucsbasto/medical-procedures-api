import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity('users')
export class UserEntity extends DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('simple-array', { nullable: true })
  roles: string[];
}

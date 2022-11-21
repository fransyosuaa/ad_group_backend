import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import { UserType } from '../enums';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string = v4();

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
  })
  type: UserType = UserType.REGULER;

  @Column({
    nullable: false,
    default: '',
  })
  token: string;
}

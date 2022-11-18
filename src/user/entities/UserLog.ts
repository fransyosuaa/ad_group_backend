import { Column, PrimaryColumn, Entity } from 'typeorm';
import { v4 } from 'uuid';
import { ActionLogType } from '../enums';

@Entity()
export class UserLog {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string = v4();

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  action: ActionLogType;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date = new Date();
}

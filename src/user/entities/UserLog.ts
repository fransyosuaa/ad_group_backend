import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

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
  action: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date = new Date();
}

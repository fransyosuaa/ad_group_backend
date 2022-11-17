import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class IpLabelLog {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  ipAddress: string;

  @Column({
    nullable: false,
    default: '',
  })
  oldLabel: string;

  @Column({
    nullable: false,
    default: '',
  })
  newLabel: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date = new Date();

  @Column({
    nullable: false,
    default: '',
  })
  createdBy: string;
}

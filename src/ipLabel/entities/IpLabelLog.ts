import { Column, PrimaryColumn, Entity } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class IpLabelLog {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string = v4();

  @Column({
    type: 'uuid',
    nullable: false,
    default: '',
  })
  ipLabelId: string;

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

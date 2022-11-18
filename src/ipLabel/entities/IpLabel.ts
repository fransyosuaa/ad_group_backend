import { Column, PrimaryColumn, Entity } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class IpLabel {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string = v4();

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  ipAddress: string;

  @Column({
    nullable: false,
    default: '',
  })
  label: string;
}

import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class IpLabel {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

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

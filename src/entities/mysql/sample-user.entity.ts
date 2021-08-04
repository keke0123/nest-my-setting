import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  database: 'sample',
})
export class SampleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plane } from '../../planes/entities/plane.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Plane, plane => plane.company)
  planes: Plane[];
}

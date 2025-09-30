import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  code?: string; 

  @OneToMany(() => City, city => city.country)
  cities: City[];
}

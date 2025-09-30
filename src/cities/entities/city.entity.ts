import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Airport } from '../../airports/entities/airport.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Country, country => country.cities)
  country: Country;

  @OneToMany(() => Airport, airport => airport.city)
  airports: Airport[];
}

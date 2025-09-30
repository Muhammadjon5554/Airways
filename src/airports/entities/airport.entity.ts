import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Flight } from '../../flights/entities/flight.entity';

@Entity('airports')
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ unique: true })
  name: string;

  @Column()
  code: string; 

  @ManyToOne(() => City, city => city.airports)
  city: City;

  @Column()
  cityId: string;

  @OneToMany(() => Flight, flight => flight.fromAirport)
  departures: Flight[];

  @OneToMany(() => Flight, flight => flight.toAirport)
  arrivals: Flight[];
}

import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
  } from 'typeorm';
  import { Company } from '../../companies/entities/company.entity';
  import { Seat } from '../../seats/entities/seat.entity';
  import { Flight } from '../../flights/entities/flight.entity';
  
  @Entity('planes')
  export class Plane {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;  

    @Column()
    model: string;
  
    @ManyToOne(() => Company, company => company.planes)
    company: Company;
  
    @OneToMany(() => Seat, seat => seat.plane)
    seats: Seat[];
  
    @OneToMany(() => Flight, flight => flight.plane)
    flights: Flight[];
  }
  
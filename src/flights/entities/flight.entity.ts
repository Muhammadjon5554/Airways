import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, OneToMany
  } from 'typeorm';
  import { Plane } from '../../planes/entities/plane.entity';
  import { Airport } from '../../airports/entities/airport.entity';
  import { Ticket } from '../../tickets/entities/ticket.entity';
  
  @Entity('flights')
  export class Flight {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    flightNumber: string;
  
    @ManyToOne(() => Plane, plane => plane.flights)
    plane: Plane;
  
    @ManyToOne(() => Airport, airport => airport.departures)
    fromAirport: Airport;
  
    @ManyToOne(() => Airport, airport => airport.arrivals)
    toAirport: Airport;
  
    @Column('timestamp')
    departureTime: Date;
  
    @Column('timestamp')
    arrivalTime: Date;
  
    @OneToMany(() => Ticket, ticket => ticket.flight)
    tickets: Ticket[];
  }
  
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    OneToMany
  } from 'typeorm';
  import { Role } from '../../roles/entities/role.entity';
  import { Ticket } from '../../tickets/entities/ticket.entity';
  import { Review } from '../../reviews/entities/review.entity';
  import { Loyalty } from '../../loyalty/entities/loyalty.entity';
  
  export enum UserRole {
    USER = 'USER', 
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
  }

  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    fullName: string;
  
    @ManyToOne(() => Role, role => role.users)
    role: Role;
  
    @OneToMany(() => Ticket, ticket => ticket.user)
    tickets: Ticket[];
  
    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
  
    @OneToMany(() => Loyalty, loyalty => loyalty.user)
    loyaltyRecords: Loyalty[];
  }
  
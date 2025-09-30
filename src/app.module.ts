import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { AirportsModule } from './airports/airports.module';
import { CompaniesModule } from './companies/companies.module';
import { ClassesModule } from './classes/classes.module';
import { PlanesModule } from './planes/planes.module';
import { FlightsModule } from './flights/flights.module';
import { SeatsModule } from './seats/seats.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TicketsModule } from './tickets/tickets.module';
import { NewsModule } from './news/news.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { config } from 'dotenv';
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
config(); 

@Module({
  imports: [

    ConfigModule.forRoot({ 
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD ,
      database: 'airways',
      autoLoadEntities: true,
      synchronize: true,  
    }),

    
    CountriesModule,
    CitiesModule,
    AirportsModule,
    CompaniesModule,
    ClassesModule,
    PlanesModule,
    FlightsModule,
    SeatsModule,
    UsersModule,
    RolesModule,
    TicketsModule,
    NewsModule,
    LoyaltyModule, 
    ReviewsModule,
    PaymentsModule
  ],
})
export class AppModule {}

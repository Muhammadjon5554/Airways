import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;



  @Column('text')
  content: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;
}

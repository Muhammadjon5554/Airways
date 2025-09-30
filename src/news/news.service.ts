import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
  ) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const news = this.newsRepo.create({
      title: dto.title,
      content: dto.content,
      ...(dto.image ? { image: dto.image } : {}),
    });
    return await this.newsRepo.save(news);
  }
  
  findAll(): Promise<News[]> {
    return this.newsRepo.find();
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsRepo.findOne({ where: { id } });
    if (!news) throw new NotFoundException('News not found');
    return news;
  }

  async update(id: string, dto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    Object.assign(news, dto);
    return await this.newsRepo.save(news);
  }

  async remove(id: string): Promise<void> {
    const news = await this.findOne(id);
    await this.newsRepo.remove(news);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<Article> {
    const user = await this.usersService.findOneByUserId(userId);
    const article = this.articleRepository.create({
      ...createArticleDto,
      author: user,
    });
    return this.articleRepository.save(article);
  }
}

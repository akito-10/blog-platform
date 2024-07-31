import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from '../users/users.service';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    articleId: number,
  ): Promise<Comment> {
    const user = await this.usersService.findOneByUserId(userId);
    const article = await this.articlesService.findOne(articleId);

    const comment = this.commentRepository.create({
      ...createCommentDto,
      author: user,
      article: article,
    });

    return this.commentRepository.save(comment);
  }

  async findAllByArticle(articleId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['author', 'article'],
    });
  }
}

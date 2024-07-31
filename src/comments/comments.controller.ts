import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('articleId') articleId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(
      createCommentDto,
      req.user.id,
      articleId,
    );
  }

  @ApiOperation({ summary: 'Get all comments for an article' })
  @ApiResponse({
    status: 200,
    description: 'Return all comments for the article.',
  })
  @ApiParam({ name: 'articleId', description: 'The ID of the article' })
  @Get()
  async findAllByArticle(@Param('articleId') articleId: number) {
    return this.commentsService.findAllByArticle(articleId);
  }
}

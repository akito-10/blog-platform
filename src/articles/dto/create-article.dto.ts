import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Sample Title',
    description: 'The title of the article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is the content of the article',
    description: 'The content of the article',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'The tags of the article',
  })
  @IsArray()
  @ArrayNotEmpty()
  tags: string[];

  @ApiProperty({
    example: 'category1',
    description: 'The category of the article',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}

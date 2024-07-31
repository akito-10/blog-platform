import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This is a comment',
    description: 'The content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

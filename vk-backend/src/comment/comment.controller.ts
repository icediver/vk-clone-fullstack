import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get('by-post/:postId')
	async getCommentByPostId(@Param('postId') postId: number) {
		return this.commentService.byPostId(postId);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createComment(
		@CurrentUser('id') userId: number,
		@Body() createCommentDto: CreateCommentDto
	) {
		return this.commentService.create(userId, createCommentDto);
	}
}

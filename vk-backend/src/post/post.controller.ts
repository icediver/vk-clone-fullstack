import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	//--------------------Create--------------------//

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(
		@Body() createPostDto: CreatePostDto,
		@CurrentUser('id') userId: number
	) {
		return this.postService.create(userId, createPostDto);
	}

	//--------------------Read----------------------//
	@Get()
	async getAll() {
		return this.postService.getAll();
	}

	@Get('by-userId/:userId')
	async getByUserId(@Param('userId') userId: number) {
		return this.postService.byUserId(+userId);
	}

	//--------------------Update--------------------//
	//--------------------Delete--------------------//

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async remove(@Param('id') id: string) {
		return this.postService.delete(+id);
	}
}

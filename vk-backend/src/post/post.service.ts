import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {}

	async create(userId: number, dto: CreatePostDto) {
		const newPost = await this.postRepository.create({
			...dto,
			user: { id: userId }
		});
		return this.postRepository.save(newPost);
	}

	async getAll() {
		const posts = await this.postRepository.find({
			relations: { user: true },
			select: { user: { avatarPath: true, name: true, isVerified: true } },
			order: { createdAt: 'desc' }
		});
		return posts;
	}

	async byUserId(userId: number) {
		const posts = await this.postRepository.find({
			where: { user: { id: userId } },
			relations: { user: true },
			select: {
				user: { id: true, avatarPath: true, name: true, isVerified: true }
			},
			order: { createdAt: 'DESC' }
		});
		return posts;
	}

	async delete(id: number) {
		const deletePost = await this.postRepository.delete({ id });
		if (!deletePost) throw new NotFoundException('user not found');
		return deletePost;
	}
}

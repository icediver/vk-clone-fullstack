import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	//--------------------Create--------------------//
	//--------------------Read----------------------//

	async searchUser(searchTerm: string) {
		let options: FindOptionsWhereProperty<UserEntity> = {};
		if (searchTerm)
			options = {
				name: ILike(`%${searchTerm}%`)
			};
		const users = await this.userRepository.find({
			where: { ...options },
			select: { id: true, name: true, avatarPath: true }
		});
		return users;
	}

	async byId(id: number) {
		// const user = await this.userRepository.findOne({
		// 	where: { id },
		// 	relations: { friends: true, posts: true },
		// 	select: { friends: { id: true, name: true, avatarPath: true } }
		// });

		const user = await this.userRepository
			.createQueryBuilder('user')
			.leftJoin('user.friends', 'friends')
			.addSelect([
				'friends.id',
				'friends.name',
				'friends.avatarPath',
				'friends.isVerified'
			])
			.loadRelationCountAndMap('user.postsCount', 'user.posts')
			.where('user.id = :id', { id })
			.getOne();
		if (!user) throw new UnauthorizedException('User not found');
		return user;
	}

	//--------------------Update--------------------//

	async updateProfile(id: number, dto: UserDto) {
		const user = await this.byId(id);
		user.name = dto.name;
		user.city = dto.city;
		user.birthDate = dto.birthDate;
		user.gender = dto.gender;
		user.avatarPath = dto.avatarPath;

		return await this.userRepository.save(user);
	}

	async toggleFriend(currentUserId: number, friendId: number) {
		const currentUser = await this.byId(currentUserId);
		const friend = await this.byId(friendId);
		const isFriend = await currentUser.friends
			.map((frn) => frn.id)
			.includes(friendId);
		if (isFriend) {
			currentUser.friends = currentUser.friends.filter(
				(frd) => frd.id !== friendId
			);
			friend.friends = friend.friends.filter((frd) => frd.id !== currentUserId);
		} else {
			currentUser.friends = [...currentUser.friends, friend];
			friend.friends = [...friend.friends, currentUser];
		}
		await this.userRepository.save(currentUser);
		await this.userRepository.save(friend);

		return `Successfully toggle friend ${!isFriend}`;
	}

	//--------------------Delete--------------------//

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}

import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { LogLikesEntity } from '../../log-likes/entities/log-likes.entity';
import { PostEntity } from '../../post/entities/post.entity';
import { Base } from '../../utils/base';
import { EnumGender } from '../user.interface';

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string;

	@Column({ default: '' })
	name: string;

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean;

	@Column({ default: '' })
	city: string;

	@Column({ name: 'birth_date', default: '' })
	birthDate: string;

	@Column({ enum: EnumGender, default: '' })
	gender: string;

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string;

	@ManyToMany(() => UserEntity)
	@JoinTable({ name: 'friends' })
	friends: UserEntity[];

	@OneToMany(() => CommentEntity, (comment) => comment.user)
	comments: CommentEntity[];

	@OneToMany(() => PostEntity, (post) => post.user)
	posts: PostEntity[];

	@OneToMany(() => LogLikesEntity, (like) => like.user)
	likes: LogLikesEntity[];
}

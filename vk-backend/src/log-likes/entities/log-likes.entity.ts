import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Base } from '../../utils/base';

@Entity('LogLikes')
export class LogLikesEntity extends Base {
	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_id' })
	post: PostEntity;
}

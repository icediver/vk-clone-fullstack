import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Base } from '../../utils/base';

@Entity('Comment')
export class CommentEntity extends Base {
	@Column()
	message: string;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_id' })
	post: PostEntity;
}

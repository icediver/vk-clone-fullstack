import { IPost } from '@/types/post.interface';
import { IUser } from '@/types/user.interface';

export interface IComment {
	id: number;
	message: string;
	user: IUser;
	post: IPost;
}

export interface ICommentFields extends Pick<IComment, 'message'> {
	postId: number;
}

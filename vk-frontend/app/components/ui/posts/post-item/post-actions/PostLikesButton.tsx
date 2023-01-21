import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { FC } from 'react';

import { LogLikeService } from '@/services/log-likes.service';

import { useAuth } from '@/hooks/useAuth';

const PostLikesButton: FC<{ postId: number }> = ({ postId }) => {
	const { user } = useAuth();

	const { data: likes, refetch: refetch } = useQuery(
		['get likes', postId],
		() => LogLikeService.getCountLikesByPostId(postId),
		{
			enabled: !!postId,
			select: ({ data }) => data,
			onSuccess: data => {}
		}
	);
	const { data: isLiked, refetch: refetchLikeStatus } = useQuery(
		['check like by post id', postId],
		() => LogLikeService.checkExists(postId),
		{
			enabled: !!postId && !!user,
			select: ({ data }) => data,
			onSuccess: data => {}
		}
	);

	const { mutateAsync } = useMutation(
		['toggle like', postId],
		() => LogLikeService.toggleLike(postId),
		{
			onSuccess: async () => {
				await refetchLikeStatus();
				await refetch();
			}
		}
	);

	return (
		<Button
			icon={
				isLiked ? (
					<HeartFilled style={{ color: '#40a9ff' }} />
				) : (
					<HeartOutlined />
				)
			}
			type={'dashed'}
			onClick={() => mutateAsync()}
			className={'outline-none'}
		>
			<span>{likes}</span>
		</Button>
	);
};

export default PostLikesButton;

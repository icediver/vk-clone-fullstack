import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, notification } from 'antd';
import { FC } from 'react';

import { PostService } from '@/services/post.service';

import { errorCatch } from '../../../../api/api.utils';

const DeletePostButton: FC<{ postId: number; refetch: any }> = ({
	postId,
	refetch
}) => {
	const { mutate, isLoading } = useMutation(
		['delete post'],
		() => PostService.delete(postId),
		{
			onSuccess() {
				refetch();
				notification.success({ message: 'Post deleted success ' });
			},
			onError(error) {
				notification.error({ message: errorCatch(error) });
			}
		}
	);

	return (
		<Button
			type={'text'}
			style={{
				position: 'absolute',
				top: 24,
				right: 24,
				opacity: 0.5
			}}
			title={'Delete post'}
			onClick={() => mutate()}
			disabled={isLoading}
		>
			<DeleteOutlined style={{ color: '#f8466e' }} />
		</Button>
	);
};

export default DeletePostButton;

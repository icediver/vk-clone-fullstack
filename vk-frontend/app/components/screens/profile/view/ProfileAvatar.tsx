import { useMutation } from '@tanstack/react-query';
import { Button, Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { ConversationService } from '@/services/conversation.service';
import { UserService } from '@/services/user.service';

import { IUser } from '@/types/user.interface';

import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

const ProfileAvatar: FC<{ profile: IUser }> = ({ profile }) => {
	const { user } = useAuth();

	const isMyProfile = user?.id === profile.id;

	const { data, refetch } = useProfile();

	const isExistFriend = data?.friends?.some(friend => friend.id === profile.id);

	const { mutate } = useMutation(
		['toggle friend', profile.id],
		() => UserService.toggleFriend(profile.id),
		{
			onSuccess: async () => {
				await refetch();
			}
		}
	);

	const { push } = useRouter();

	const { mutate: createConversation } = useMutation(
		['create conversation'],
		() => ConversationService.create(profile.id),
		{
			onSuccess: async ({ data }) => {
				await push(`/conversation/${data?.id}?with=${profile.id}`);
			}
		}
	);

	return (
		<Card style={{ textAlign: 'center' }}>
			<Image
				src={profile.avatarPath || ''}
				alt={profile.name}
				width={300}
				height={300}
				quality={90}
				priority={true}
				// layout={'responsive'}
				style={{ borderRadius: 10 }}
			/>

			<Button
				type={'dashed'}
				style={{ margin: '15px 0', width: 150 }}
				disabled={isMyProfile}
				onClick={() => {
					mutate();
				}}
			>
				{isExistFriend ? 'Remove from friends' : 'Add to friends'}
			</Button>
			<Button
				type={'primary'}
				disabled={isMyProfile}
				style={{ width: 150 }}
				onClick={() => createConversation()}
			>
				Send message
			</Button>
		</Card>
	);
};

export default ProfileAvatar;

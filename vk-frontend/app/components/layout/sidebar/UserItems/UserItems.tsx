import { MessageOutlined } from '@ant-design/icons';
import { Card, List, Skeleton, Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ListItem from '@/components/layout/sidebar/ListItem';
import UserItem from '@/components/layout/sidebar/UserItems/UserItem';

import { IUser } from '@/types/user.interface';

import { useProfile } from '@/hooks/useProfile';

import styles from '../Sidebar.module.scss';

const UserItems: FC = () => {
	const { push } = useRouter();

	const { isLoading, data } = useProfile();

	return (
		<Card className={styles.card}>
			<Typography.Title level={5} style={{ marginBottom: 15 }}>
				Мои друзья
			</Typography.Title>
			{isLoading ? (
				<Skeleton />
			) : data?.friends?.length ? (
				data.friends?.map((user: IUser, index: number) => {
					return <UserItem key={index} user={user} />;
				})
			) : (
				<div>Друзей нет</div>
			)}
			<List itemLayout={'vertical'}>
				<ListItem
					item={{
						title: 'Message',
						icon: MessageOutlined,
						link: '/conversation'
					}}
				/>
			</List>
		</Card>
	);
};

export default UserItems;

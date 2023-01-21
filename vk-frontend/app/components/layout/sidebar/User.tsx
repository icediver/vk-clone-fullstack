import { CheckCircleTwoTone, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, List, Row } from 'antd';
import { useRouter } from 'next/router';

import ListItem from '@/components/layout/sidebar/ListItem';

import { AuthService } from '@/services/auth/auth.service';

import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

import styles from './Sidebar.module.scss';

const User = () => {
	const { setUser } = useAuth();
	const { push } = useRouter();
	const { data } = useProfile();

	return (
		<Card className={styles.card}>
			<Row gutter={[5, 5]}>
				<Col span={5}>
					<Avatar alt='' src={data?.avatarPath} size={46} />
				</Col>
				<Col span={19} style={{ display: 'flex', alignItems: 'center' }}>
					<div>
						{data?.name}{' '}
						{data?.isVerified && (
							<CheckCircleTwoTone
								style={{ color: '#5B9CE6', opacity: '0.8', marginLeft: 5 }}
							/>
						)}
					</div>
				</Col>
			</Row>
			<List style={{ marginTop: '1rem', marginLeft: 0 }}>
				<ListItem
					item={{
						link: '/profile/edit',
						title: 'Edit profile',
						icon: EditOutlined
					}}
				/>
			</List>
			<Button
				type='dashed'
				onClick={() => {
					push(
						`https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?redirect=http://localhost:3000`
					);

					AuthService.logout();
					setUser && setUser(null);
				}}
			>
				Выйти
			</Button>
		</Card>
	);
};

export default User;

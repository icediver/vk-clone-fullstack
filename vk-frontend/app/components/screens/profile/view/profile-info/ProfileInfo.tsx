import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Row, Typography } from 'antd';
import { FC } from 'react';

import CountItem from '@/components/screens/profile/view/profile-info/CountItem';
import InfoItem from '@/components/screens/profile/view/profile-info/InfoItem';

import { IUser } from '@/types/user.interface';

import { numWord } from '../../../../../utils/numWord';

const ProfileInfo: FC<{ profile: IUser }> = ({ profile }) => {
	return (
		<Card style={{ textAlign: 'center' }}>
			<Typography.Title level={1}>
				{profile.name}{' '}
				{profile?.isVerified && (
					<CheckCircleTwoTone
						style={{ color: '#5B9CE6', opacity: '0.8', marginLeft: 5 }}
					/>
				)}
			</Typography.Title>
			<div style={{ marginBottom: 35 }}>
				<InfoItem name={'Birthday data:'} value={profile.birthDate} />
				<InfoItem name={'City:'} value={profile.city} />
				<InfoItem name={'Gender:'} value={profile.gender} />
			</div>
			<Row gutter={[15, 15]}>
				<CountItem
					title={numWord(profile.friends?.length || 0, [
						'friend',
						'friends',
						'friends'
					])}
					number={profile.friends?.length}
				/>
				<CountItem
					title={numWord(profile.postsCount || 0, ['post', 'posts', 'posts'])}
					number={profile.postsCount}
				/>
			</Row>
		</Card>
	);
};

export default ProfileInfo;

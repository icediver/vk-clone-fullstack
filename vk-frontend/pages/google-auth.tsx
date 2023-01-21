import { useMutation } from '@tanstack/react-query';
import { Spin, notification } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthService } from '@/services/auth/auth.service';

import { useAuth } from '@/hooks/useAuth';

import { errorCatch } from '../app/api/api.utils';

const GoogleAuthPage: NextPage = () => {
	const { setUser } = useAuth();
	const { query, push } = useRouter();
	const code = query?.code;
	const { mutate } = useMutation(
		['send code token'],
		(code: string) => AuthService.loginGoogle(code),
		{
			async onSuccess(user) {
				notification.success({ message: `Auth access`, duration: 1 });
				setUser && setUser(user);
				await push('/');
			},
			onError(error) {
				notification.error({ message: errorCatch(error), duration: 1 });
			}
		}
	);

	useEffect(() => {
		if (code) mutate(String(code));
	}, [code, mutate]);

	return (
		<div className={'center-block'}>
			<Spin size={'large'} />
		</div>
	);
};

export default GoogleAuthPage;

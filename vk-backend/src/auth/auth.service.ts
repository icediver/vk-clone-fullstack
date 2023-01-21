import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { IGoogleProfile, IResGoogleUser } from './auth.interface';
import { GoogleCodeDto } from './dto/google-code.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async validateUser(details: IResGoogleUser) {
		let user = await this.userRepository.findOne({
			where: {
				email: details.email
			},
			select: ['id', 'email', 'avatarPath', 'name']
		});
		if (!user) {
			const newUser = await this.userRepository.create(details);
			user = await this.userRepository.save(newUser);
		}
		return {
			user,
			accessToken: await this.issueAccessToken(user.id)
		};
	}

	async issueAccessToken(userId: number) {
		const data = { id: userId };

		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		});
	}

	async getGoogleToken(code: string) {
		return await firstValueFrom(
			this.httpService
				.post<{ access_token: string }>('https://oauth2.googleapis.com/token', {
					code,
					client_id: this.configService.get('GOOGLE_CLIENT_ID'),
					client_secret: this.configService.get('GOOGLE_SECRET'),
					redirect_uri: 'http://localhost:3000/google-auth',
					grant_type: 'authorization_code'
				})
				.pipe(map((res) => res.data))
		);
	}

	async getGoogleProfile(accessToken: string) {
		return await firstValueFrom(
			this.httpService
				.get<IGoogleProfile>('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
				.pipe(map((res) => res.data))
		);
	}

	async googleLogin({ code }: GoogleCodeDto) {
		if (!code) {
			throw new BadRequestException('Google code not found');
		}

		try {
			const { access_token } = await this.getGoogleToken(code);
			const profile = await this.getGoogleProfile(access_token);
			return await this.validateUser({
				email: profile.email,
				name: profile.name,
				avatarPath: profile.picture
			});
		} catch (e) {
			throw new HttpException(e.response?.data, e.response?.status);
		}
	}
}

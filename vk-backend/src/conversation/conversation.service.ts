import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../message/entities/message.entity';
import { ConversationEntity } from './entities/conversation.entity';

@Injectable()
export class ConversationService {
	constructor(
		@InjectRepository(ConversationEntity)
		private readonly conversationRepository: Repository<ConversationEntity>,
		@InjectRepository(MessageEntity)
		private readonly messageRepository: Repository<MessageEntity>
	) {}

	//--------------------Read----------------------//
	async byId(id: number) {
		return this.conversationRepository.findOne({
			where: { id },
			relations: { messages: { userTo: true, userFrom: true } }
		});
	}

	//--------------------Create--------------------//
	async create(currentUserId: number, withUserId: number) {
		/*let message = await this.messageRepository.findOne({
      where: {
        userFrom: { id: currentUserId },
        userTo: { id: withUserId }
      },
      relations: { conversation: true }
    });
    if (!message)
      message = await this.messageRepository.findOne({
        where: {
          userTo: { id: currentUserId },
          userFrom: { id: withUserId }
        },
        relations: { conversation: true }
      });*/

		const message = await this.messageRepository.findOne({
			where: [
				{
					userFrom: { id: currentUserId },
					userTo: { id: withUserId }
				},
				{
					userTo: { id: currentUserId },
					userFrom: { id: withUserId }
				}
			],
			relations: { conversation: true }
		});

		if (message) {
			return this.conversationRepository.findOne({
				where: { id: message.conversation.id },
				relations: { messages: true }
			});
		}

		const conversation = await this.conversationRepository.create({
			messages: []
		});

		return this.conversationRepository.save(conversation);
	}
}

//--------------------Update--------------------//
//--------------------Delete--------------------//

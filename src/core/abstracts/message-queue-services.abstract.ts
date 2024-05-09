import { User } from '../entities';

export abstract class IMessageQueueServices {
  abstract sendMessage(userInfo: User);
}

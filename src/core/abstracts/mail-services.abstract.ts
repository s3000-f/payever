import { User } from '../entities';

export abstract class IMailServices {
  abstract sendEmail(userInfo: User);
}

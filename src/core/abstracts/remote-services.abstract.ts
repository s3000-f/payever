import { User } from '../entities';

export abstract class IRemoteServices {
  abstract retrieveUser(id: number): Promise<User>;
}

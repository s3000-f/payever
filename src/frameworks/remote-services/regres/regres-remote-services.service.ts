import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IRemoteServices } from '../../../core/abstracts/remote-services.abstract';
import { User } from '../../../core/entities';
import { REMOTE_SERVICE_CONFIGURATION } from '../../../configuration';
@Injectable()
export class RegresRemoteServices implements IRemoteServices {
  constructor(private readonly httpService: HttpService) {}

  async retrieveUser(id: number): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.get(REMOTE_SERVICE_CONFIGURATION.regresBaseURL + id),
    );

    return {
      avatarURL: response.data.data.avatar,
      id: response.data.data.id,
      email: response.data.data.email,
      firstName: response.data.data.first_name,
      lastName: response.data.data.last_name,
    } as User;
  }
}

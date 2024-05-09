import { RegresRemoteServices } from './regres-remote-services.service';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { REMOTE_SERVICE_CONFIGURATION } from '../../../configuration';
import { AxiosResponse } from 'axios';

jest.mock('@nestjs/axios', () => ({
  HttpService: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

describe('RegresRemoteServices', () => {
  let regresRemoteServices: RegresRemoteServices;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    regresRemoteServices = new RegresRemoteServices(httpService);
  });

  describe('retrieveUser', () => {
    it('should retrieve user details from a remote service and return a User entity', async () => {
      const userId = 1;
      const mockResponse = {
        data: {
          data: {
            id: 1,
            email: 'john.doe@example.com',
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'http://example.com/avatar.jpg',
          },
        },
      };
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(
          of(mockResponse) as unknown as Observable<AxiosResponse>,
        );
      const result = await regresRemoteServices.retrieveUser(userId);

      expect(httpService.get).toHaveBeenCalledWith(
        REMOTE_SERVICE_CONFIGURATION.regresBaseURL + userId,
      );
      expect(result).toEqual({
        id: 1,
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        avatarURL: 'http://example.com/avatar.jpg',
      });
    });
  });
});

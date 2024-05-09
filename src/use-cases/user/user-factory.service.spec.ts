import { UserFactoryService } from './user-factory.service';
import { CreateUserDto } from '../../core/dtos';
import { FileInfo } from '../../core/entities/file-info.entity';

describe('UserFactoryService', () => {
  let userFactoryService: UserFactoryService;

  beforeEach(() => {
    userFactoryService = new UserFactoryService();
  });

  // Test cases will be added here
  describe('createNewUser', () => {
    it('should create a new User entity from CreateUserDto', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        id: 1,
        avatarUrl: 'http://example.com/avatar.jpg',
      };

      const user = userFactoryService.createNewUser(createUserDto);

      expect(user).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        id: 1,
        avatarURL: 'http://example.com/avatar.jpg',
      });
    });
  });
  describe('createNewAvatar', () => {
    it('should create a new Avatar entity from ID and FileInfo', () => {
      const fileInfo: FileInfo = {
        file: 'path/to/file.jpg',
        url: 'http://example.com/file.jpg',
        hash: '12345',
      };
      const avatarId = 1;

      const avatar = userFactoryService.createNewAvatar(avatarId, fileInfo);

      expect(avatar).toEqual({
        file: 'path/to/file.jpg',
        id: 1,
        url: 'http://example.com/file.jpg',
        hash: '12345',
      });
    });
  });
  describe('createUserResponse', () => {
    it('should create a CreateUserResponseDto from a User entity', () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        id: 1,
        avatarURL: 'http://example.com/avatar.jpg',
      };

      const responseDto = userFactoryService.createUserResponse(user);

      expect(responseDto).toEqual({
        success: true,
        createdUser: {
          id: 1,
          avatarURL: 'http://example.com/avatar.jpg',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          firstName: 'John',
        },
      });
    });
  });
});

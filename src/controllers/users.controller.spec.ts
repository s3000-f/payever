import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { CreateUserDto } from '../core/dtos';
import { HttpExceptionFilter } from '../core/filters/http-exception.filter';

describe('UsersController', () => {
  let usersController: UsersController;
  let userUseCases: UserUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserUseCases,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    })
      .overrideFilter(HttpExceptionFilter)
      .useValue({})
      .compile();

    usersController = module.get<UsersController>(UsersController);
    userUseCases = module.get<UserUseCases>(UserUseCases);
  });

  // Test cases will be added here
  describe('createUser', () => {
    it('should successfully create a user', async () => {
      const mockUserDto: CreateUserDto = {
        id: 100,
        email: 'rachel100@reqres.in',
        firstName: 'Rachel',
        lastName: 'Howell',
        avatarUrl: 'https://reqres.in/img/faces/12-image.jpg',
      };
      const mockResult = {
        success: true,
        createdUser: {
          id: 100,
          email: 'rachel100@reqres.in',
          firstName: 'Rachel',
          lastName: 'Howell',
          avatarURL: 'https://reqres.in/img/faces/12-image.jpg',
        },
      };
      jest.spyOn(userUseCases, 'createUser').mockResolvedValue(mockResult);

      await expect(usersController.createUser(mockUserDto)).resolves.toEqual(
        mockResult,
      );
      expect(userUseCases.createUser).toHaveBeenCalledWith(mockUserDto);
    });
  });
});

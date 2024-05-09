import { MongoGenericRepository } from './mongo-generic-repository';
import { Model } from 'mongoose';

const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('MongoGenericRepository', () => {
  let repository: MongoGenericRepository<any>;

  beforeEach(() => {
    repository = new MongoGenericRepository(
      mockRepository as unknown as Model<any>,
    );
  });

  describe('get', () => {
    it('should retrieve and return an entity by ID', async () => {
      const returnedEntity = {
        _id: '663c878f9abf971aaaa221fa',
        id: 12,
        firstName: 'Rachel',
        lastName: 'Howell',
        email: 'rachel.howell@reqres.in',
        avatarURL: 'https://reqres.in/img/faces/12-image.jpg',
        __v: 0,
      };
      mockRepository.findOne.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(returnedEntity),
        }),
      });

      const result = await repository.get(12);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 12 });
      expect(result).toEqual(returnedEntity);
    });
  });
  describe('create', () => {
    it('should create and return a new entity', async () => {
      const newEntity = {
        id: 12,
        firstName: 'Rachel',
        lastName: 'Howell',
        email: 'rachel.howell@reqres.in',
        avatarURL: 'https://reqres.in/img/faces/12-image.jpg',
      };

      mockRepository.create.mockResolvedValue(newEntity);

      const result = await repository.create(newEntity);

      expect(mockRepository.create).toHaveBeenCalledWith(newEntity);
      expect(result).toEqual(newEntity);
    });
  });
  describe('update', () => {
    it('should update and return the entity', async () => {
      const updateEntity = {
        id: 12,
        firstName: 'Rachel',
        lastName: 'Howell',
        email: 'rachel.howell@reqres.in',
        avatarURL: 'https://reqres.in/img/faces/12-image.jpg',
      };
      mockRepository.findOneAndUpdate.mockReturnValue(
        Promise.resolve(updateEntity),
      );

      const result = await repository.update(12, updateEntity);

      expect(mockRepository.findOneAndUpdate).toHaveBeenCalledWith(
        { id: 12 },
        updateEntity,
      );
      expect(result).toEqual(updateEntity);
    });
  });
  describe('delete', () => {
    it('should delete the entity by ID', async () => {
      mockRepository.deleteOne.mockReturnValue({
        acknowledged: true,
        deletedCount: 1,
      });

      const result = await repository.delete(123);

      expect(mockRepository.deleteOne).toHaveBeenCalledWith({ id: 123 });
      expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
    });
  });
});

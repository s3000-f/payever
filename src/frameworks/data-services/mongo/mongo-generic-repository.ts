import { Model } from 'mongoose';
import { IGenericRepository } from '../../../core';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async get(id: any): Promise<T> {
    return this._repository
      .findOne({ id: id })
      .populate(this._populateOnFind)
      .exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: number, item: T) {
    return this._repository.findOneAndUpdate({ id: id }, item);
  }

  delete(id: number) {
    return this._repository.deleteOne({ id: id });
  }
}

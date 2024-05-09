import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../../core';
import { MongoGenericRepository } from './mongo-generic-repository';
import { User, UserDocument, Avatar, AvatarDocument } from './model';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  avatars: MongoGenericRepository<Avatar>;

  constructor(
    @InjectModel(User.name)
    private AuthorRepository: Model<UserDocument>,
    @InjectModel(Avatar.name)
    private GenreRepository: Model<AvatarDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.AuthorRepository);
    this.avatars = new MongoGenericRepository<Avatar>(this.GenreRepository);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';


@Injectable()
export class AppService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async create(auth: Auth): Promise<Auth> {
    const createdAuth = new this.authModel(auth);
    return createdAuth.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  getHello(): string {
    return 'Hello from Auth Server!';
  }
}
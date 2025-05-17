import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>, private readonly jwtService: JwtService) {}

  async create(auth: Auth): Promise<Auth> {
    const hashPassword = await bcrypt.hash(auth.password, 10);
    auth.password = hashPassword;
    const createdAuth = new this.authModel(auth);
    return createdAuth.save();
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.authModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, role: user.role };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  //이것도 일단 나둬
  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  getHello(): string {
    return 'Hello from Auth Server!';
  }
}
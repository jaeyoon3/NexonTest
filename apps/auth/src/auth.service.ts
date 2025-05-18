import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
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

  async progress(userId: string, eventId: string, conditionId: string) {
    const user = await this.authModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const existingProgress = user.eventProgress.find(
      (progress) =>
        progress.eventId === eventId && progress.conditionId === conditionId
    );
    if (existingProgress) {
      await this.authModel.updateOne(
        { 'eventProgress.eventId': eventId, 'eventProgress.conditionId': conditionId },
        { $inc: { 'eventProgress.$.progress': 1 } }
      );
    } else {
      await this.authModel.findByIdAndUpdate(
        userId,
        {
          $push: {
              eventProgress: {
              eventId,
              conditionId,
              progress: 1,
            },
          },
        },
        { new: true }
      );
    }
    return await this.authModel.findById(userId);
  }

  async duplication(userId: string, eventId: string): Promise<boolean | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    const auth = await this.authModel.findById(userId).lean().exec();
    if (!auth) {
      return null;
    }
    return auth.successRequests.includes(eventId);
  }

  async getUserProgress(userId: string, eventId: string): Promise<number | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    const auth = await this.authModel.findById(userId).lean().exec();
    if (!auth) {
      return null;
    }
    const progressEntry = auth.eventProgress.find(
      (item: { eventId: string }) => item.eventId === eventId
    );
    console.log(progressEntry ? progressEntry.progress : null)
    return progressEntry ? progressEntry.progress : null;
  }

  async success(userId: string, eventId: string) {
    return await this.authModel.findByIdAndUpdate(
      userId,
      { $push: { successRequests: eventId } },
      { new: true }
    );
  }

  //이것도 일단 나둬
  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  getHello(): string {
    return 'Hello from Auth Server!';
  }
}
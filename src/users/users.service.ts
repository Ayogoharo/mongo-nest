import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(CreateUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    userId: string,
  ): Promise<User | null> {
    if (id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }

    // Check if email or username already exists (if being updated)
    if (updateUserDto.email || updateUserDto.username) {
      const existingUser = await this.userModel.findOne({
        _id: { $ne: id },
        $or: [
          ...(updateUserDto.email ? [{ email: updateUserDto.email }] : []),
          ...(updateUserDto.username
            ? [{ username: updateUserDto.username }]
            : []),
        ],
      });

      if (existingUser) {
        throw new UnauthorizedException(
          'User with this email or username already exists',
        );
      }
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<User | null> {
    if (id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this user',
      );
    }
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

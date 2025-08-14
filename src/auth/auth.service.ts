import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { email, username, password, ...userData } = signupDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new this.userModel({
      email,
      username,
      password: hashedPassword,
      ...userData,
    });

    const savedUser = await user.save();

    // Generate JWT token
    const payload = {
      sub: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
    };
    const access_token = this.jwtService.sign(payload);

    // Return response without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userResponse } = savedUser.toObject();

    return {
      access_token,
      user: {
        ...userResponse,
        _id: userResponse._id.toString(),
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    if (!loginDto.login || !loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { login, password } = loginDto;

    // Find user by email or username
    const user = await this.userModel
      .findOne({
        $or: [{ email: login }, { username: login }],
      })
      .select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      sub: user._id,
      email: user.email,
      username: user.username,
    };
    const access_token = this.jwtService.sign(payload);

    // Return response without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userResponse } = user.toObject();

    return {
      access_token,
      user: {
        ...userResponse,
        _id: userResponse._id.toString(),
      },
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }
}

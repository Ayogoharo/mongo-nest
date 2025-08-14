import { Controller, Delete, Get, Param, Req, UseGuards, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';
import express from 'express';

interface JwtPayload {
  sub: string;
  email?: string;
  _id: string;
  iat?: number;
  exp?: number;
}

interface AuthenticatedRequest extends express.Request {
  user: JwtPayload;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<User | null> {
    const userId = req.user.sub;
    return this.usersService.update(id, updateUserDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<User | null> {
    const userId = req.user.sub;
    return this.usersService.remove(id, userId);
  }
}

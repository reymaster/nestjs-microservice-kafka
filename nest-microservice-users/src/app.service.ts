import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ where: { status: 'ACTIVE' } });
  }

  async find(userId: string): Promise<User> {
    const {
      id,
      name,
      email,
      phone,
      password,
      createdAt,
      status,
      deletedAt,
    } = await this.userRepository.findOne(userId);

    const response = {
      id,
      name,
      email,
      phone,
      password,
      createdAt,
      status,
      deletedAt,
    };

    return response;
  }

  async create(user: IUser): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(userData: User): Promise<void> {
    const { id, name, email, phone, password } = userData;
    const user = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async activate(id: string): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVE' });
  }

  async deactivate(id: string): Promise<void> {
    await this.userRepository.update(id, { status: 'DEACTIVATED' });
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.userRepository.update(id, { deletedAt: null });
  }
}

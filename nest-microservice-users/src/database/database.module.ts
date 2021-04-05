import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../interfaces/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'default',
      password: 'secret',
      database: 'nest_ms_users',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

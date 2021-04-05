import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  onModuleInit() {
    const requestPatterns = ['get_user', 'get_all_user', 'create_user'];

    requestPatterns.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<User[]> {
    return this.client.send('get_all_user', {});
  }

  @Get(':id')
  find(@Param('id') id: string): Observable<User> {
    return this.client.send('get_user', { id });
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<User> {
    return this.client.send('create_user', user);
  }

  @Patch(':id')
  @ApiBody({ type: UserDto })
  update(
    @Param('id') id: string,
    @Body() { name, email, phone, password }: UserDto,
  ) {
    const payload = {
      id,
      name,
      email,
      phone,
      password,
    };
    return this.client.emit('update_user_data', payload);
  }

  @Patch(':id/activate')
  @ApiBody({ type: String })
  activate(@Param('id') id: string) {
    return this.client.emit('activate_user', { id });
  }

  @Patch(':id/deactivate')
  @ApiBody({ type: String })
  deactivate(@Param('id') id: string) {
    return this.client.emit('deactivate_user', { id });
  }

  @Delete(':id/soft')
  @ApiBody({ type: String })
  softDelete(@Param('id') id: string) {
    return this.client.emit('soft_delete_user', { id });
  }

  @Patch(':id/restore')
  @ApiBody({ type: String })
  restore(@Param('id') id: string) {
    return this.client.emit('restore_user', { id });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.emit('delete_user', { id });
  }
}

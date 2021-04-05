import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './interfaces/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('get_all_user')
  async index(): Promise<User[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('get_user')
  async find(@Payload() data: any): Promise<User> {
    return await this.appService.find(data.value.id);
  }

  @MessagePattern('create_user')
  async create(@Payload() data: any): Promise<User> {
    this.logger.log(`User: ${JSON.stringify(data)}`);
    return await this.appService.create(data.value);
  }

  @MessagePattern('update_user_data')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);
    return await this.appService.update(data.value);
  }

  @MessagePattern('activate_user')
  async activate(@Payload() data: any): Promise<void> {
    return await this.appService.activate(data.value.id);
  }

  @MessagePattern('deactivate_user')
  async deactivate(@Payload() data: any): Promise<void> {
    return await this.appService.deactivate(data.value.id);
  }

  @MessagePattern('soft_delete_user')
  async softDelete(@Payload() data: any): Promise<void> {
    return await this.appService.softDelete(data.value.id);
  }

  @MessagePattern('restore_user')
  async restore(@Payload() data: any): Promise<void> {
    return await this.appService.restore(data.value.id);
  }

  @MessagePattern('delete_user')
  async delete(@Payload() data: any): Promise<void> {
    return await this.appService.delete(data.value.id);
  }
}

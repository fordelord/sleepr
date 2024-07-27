import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from 'apps/notifications/src/dto/notify-email.dto';
import { NotificationsServiceController } from '@app/common';

@Controller()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  async notifyEmail(data: NotifyEmailDto) {
    await this.notificationsService.notifyEmail(data);
  }
}

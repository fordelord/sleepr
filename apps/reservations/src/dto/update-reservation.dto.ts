import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from 'apps/reservations/src/dto/create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}

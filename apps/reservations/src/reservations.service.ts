import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from 'apps/reservations/src/dto/create-reservation.dto';
import { UpdateReservationDto } from 'apps/reservations/src/dto/update-reservation.dto';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import {
  PAYMENT_SERVICE_NAME,
  PaymentServiceClient,
  UserDto,
} from '@app/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentServiceClient;
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService =
      this.client.getService<PaymentServiceClient>(PAYMENT_SERVICE_NAME);
  }

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentsService
      .createCharge({ ...createReservationDto.charge, email })
      .pipe(
        map((response) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: response.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      {
        $set: updateReservationDto,
      },
    );
  }

  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}

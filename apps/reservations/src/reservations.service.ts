import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from 'apps/reservations/src/dto/create-reservation.dto';
import { UpdateReservationDto } from 'apps/reservations/src/dto/update-reservation.dto';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import { PAYMENT_SERVICE, User } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { Reservation } from 'apps/reservations/src/models/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, id: userId }: User,
  ) {
    return this.paymentService
      .send('create_change', { ...createReservationDto.charge, email })
      .pipe(
        map((response) => {
          const reservation = new Reservation({
            ...createReservationDto,
            invoiceId: response.id,
            timestamp: new Date(),
            userId,
          });

          return this.reservationsRepository.create(reservation);
        }),
      );
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: number) {
    return this.reservationsRepository.findOne({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  remove(id: number) {
    return this.reservationsRepository.findOneAndDelete({ id });
  }
}

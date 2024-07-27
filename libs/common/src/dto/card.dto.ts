import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CardMessage } from '@app/common';

export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  expMonth: number;

  @IsNumber()
  expYear: number;

  @IsCreditCard()
  number: string;
}

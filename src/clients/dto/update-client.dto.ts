import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNumber()
  @IsPositive()
  clientId: number;
}

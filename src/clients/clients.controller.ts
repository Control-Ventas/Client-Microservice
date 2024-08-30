import { Controller, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @MessagePattern({ cmd: 'createClient' })
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @MessagePattern('findAllClients')
  findAll() {
    return this.clientsService.findAll();
  }

  @MessagePattern('findOneClient')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @MessagePattern('updateClient')
  update(@Payload() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(updateClientDto.clientId, updateClientDto);
  }

  @MessagePattern('removeClient')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }

  @MessagePattern('validateClient')
  validateClients(@Payload() clientId: number) {
    return this.clientsService.validateClients(clientId);
  }

}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ClientsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  create(createClientDto: CreateClientDto) {
    return this.client.create({
      data: createClientDto
    })
  }

  findAll() {
    return this.client.findMany({
      where: { available: true }
    });
  }

  async findOne(id: number) {
    const client = await this.client.findUnique({
      where: { clientId: id, available: true }
    });

    if (!client) {
      throw new RpcException(`Product #${id} not found`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const {clientId: _, ...data} = updateClientDto;

    let updatedProduct;
    try {
      updatedProduct = await this.client.update({
        where: { clientId: id, available: true },
        data: data
      })
    } catch (e) {
      throw new RpcException(`Product #${id} not found`);
    }


    return updatedProduct;
  }

  async remove(id: number) {
    let client;

    try {
      client = await this.client.update({
        where: { clientId: id, available: true },
        data: { available: false }
      })
    } catch (e) {
      throw new RpcException(`Product #${id} not found`);
    }
    return client;
  }

  async validateClients(clientId: number) {
    const client = await this.client.findUnique({
      where: {
        clientId: clientId, 
        available: true
      }
    });

    if (!client) {
      throw new RpcException(`The client with id ${clientId} does not exist`);
    }

    return client;
  }



}

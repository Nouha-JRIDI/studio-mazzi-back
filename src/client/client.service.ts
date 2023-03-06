import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IClient } from './interface/client.interface';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
  constructor(@InjectModel('Client') private clientModel: Model<IClient>) {}
  async createClient(createClientDto: CreateClientDto): Promise<IClient> {
    const newClient = await new this.clientModel(createClientDto);
    return newClient.save();
  }
  async updateClient(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    const existingClient = await this.clientModel.findOneAndUpdate(
      { _id: clientId, isDeleted: 'false' },
      updateClientDto,
      { new: true },
    );
    if (!existingClient) {
      throw new NotFoundException(`client #${clientId} not found`);
    }
    return existingClient;
  }
  async getAllClients(): Promise<IClient[]> {
    const clientData = await this.clientModel.find({ isDeleted: false });
    if (!clientData || clientData.length == 0) {
      throw new NotFoundException('clients data not found!');
    }
    return clientData;
  }
  async getClient(clientId: string): Promise<IClient> {
    const existingClient = await this.clientModel
      .findOne({ _id: clientId, isDeleted: 'false' })
      .exec();
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }
  async softDeleteClient(clientId: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndUpdate(clientId, {
      isDeleted: true,
    });
    if (!deletedClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return deletedClient;
  }

  async restoreClient(clientId: string): Promise<IClient> {
    const restoredClient = await this.clientModel.findByIdAndUpdate(clientId, {
      isDeleted: false,
    });
    if (!restoredClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return restoredClient;
  }

  async deleteClient(clientId: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return deletedClient;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IClient } from './interface/client.interface';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private clientModel: SoftDeleteModel<IClient>,
  ) {}
  async createClient(createClientDto: CreateClientDto): Promise<IClient> {
    const newClient = await new this.clientModel(createClientDto);
    return newClient.save();
  }
  async updateClient(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    const existingClient = await this.clientModel.findByIdAndUpdate(
      clientId,
      updateClientDto,
      { new: true },
    );
    if (!existingClient) {
      throw new NotFoundException(`client #${clientId} not found`);
    }
    return existingClient;
  }
  async getAllClients(): Promise<IClient[]> {
    const clientData = await this.clientModel.find();
    if (!clientData || clientData.length == 0) {
      throw new NotFoundException('clients data not found!');
    }
    return clientData;
  }
  async getClient(clientId: string): Promise<IClient> {
    const existingClient = await this.clientModel.findById(clientId).exec();
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }
  async deleteClient(clientId: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return deletedClient;
  }

  remove(clientId: string) {
    const filter = { _id: clientId };

    const deleted = this.clientModel.softDelete(filter);
    return deleted;

    //return this.bookModel.deleteOne(filter);
    //return this.bookModel.;
  }
}

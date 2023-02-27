import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Post()
  async createClient(
    @Res() response,
    @Body() createClientDto: CreateClientDto,
  ) {
    try {
      const newClient = await this.clientService.createClient(createClientDto);
      return response.status(HttpStatus.CREATED).send({
        message: 'Client has been created successfully',
        newClient,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: 400,
        message: 'Error: Client not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateClient(
    @Res() response,
    @Param('id') clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      const existingClient = await this.clientService.updateClient(
        clientId,
        updateClientDto,
      );
      return response.status(HttpStatus.OK).send({
        message: 'Client has been successfully updated',
        existingClient,
      });
    } catch (err) {
      return response.status(err.status).send(err.response);
    }
  }
  @Get()
  async getClients(@Res() response) {
    try {
      const clientData = await this.clientService.getAllClients();
      return response.status(HttpStatus.OK).send({
        message: 'All clients data found successfully',
        clientData,
      });
    } catch (err) {
      return response.status(err.status).send(err.response);
    }
  }
  @Get('/:id')
  async getClient(@Res() response, @Param('id') clientId: string) {
    try {
      const existingClient = await this.clientService.getClient(clientId);
      return response.status(HttpStatus.OK).send({
        message: 'Client found successfully',
        existingClient,
      });
    } catch (err) {
      return response.status(err.status).send(err.response);
    }
  }
  @Delete('/:id')
  async deleteClient(@Res() response, @Param('id') ClientId: string) {
    try {
      const deletedClient = await this.clientService.remove(ClientId);
      return response.status(HttpStatus.OK).send({
        message: 'Client deleted successfully',
        deletedClient,
      });
    } catch (err) {
      return response.status(err.status).send(err.response);
    }
  }
}

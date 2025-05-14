import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  async getAuthHello() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:4001/hello'),
    );
    return response.data;
  }

  async getEventHello() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:4002/hello'),
    );
    return response.data;
  }
}

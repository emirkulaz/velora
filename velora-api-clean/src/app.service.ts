import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      application: 'VELORA',
      description: 'Enterprise Operations Platform',
      version: '0.1.0',
      status: 'running',
      message: 'Welcome to Velora API',
    };
  }
}

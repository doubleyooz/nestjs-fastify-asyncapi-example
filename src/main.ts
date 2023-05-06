import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.enableCors({ origin: configService.get('CLIENT'), credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Etroka Auth-app')
    .setDescription('Documentation for websocket endpoints')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('chat-ws', {
      url: `ws://localhost:${port}`,
      protocol: 'socket.io',
    })
    .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup('doc', app, asyncapiDocument);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for managing users and auth')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();

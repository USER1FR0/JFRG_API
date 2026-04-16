import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './common/services/prisma.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3001',
    //origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Uso de pipes de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
    }),
  );

  const prisma = app.get(PrismaService);
  app.useGlobalFilters(new AllExceptionFilter(prisma));

  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de Seguridad')
    .setDescription('Documentacion de la api para pruebas')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// Instalar SWAGGER
//npm install @nestjs/swagger

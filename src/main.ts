import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Uso de pipes de forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
  }))

  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de Seguridad')
    .setDescription('Documentacion de la api para pruebas')
    .setVersion('1.0.0')
    .build();

    const document  = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api/docs',app,document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// Instalar SWAGGER
//npm install @nestjs/swagger


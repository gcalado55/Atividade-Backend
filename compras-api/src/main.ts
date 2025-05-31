import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // ✅ Importações do Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ativa a validação global
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Compras Online')
    .setDescription('API para gerenciar produtos e carrinhos de compras')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

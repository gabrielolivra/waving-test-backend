import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
   app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Remove campos que não estão no DTO do body
      forbidNonWhitelisted: true, // Opcional: lança erro se houver campos a mais
    }),
  );
}
bootstrap();

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
    origin: config.get<string>("CORS_ORIGIN")?.split(",") ?? ["http://localhost:3000"],
    credentials: true
  });

  app.setGlobalPrefix(config.get<string>("API_PREFIX") ?? "api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const port = config.get<number>("PORT") ?? 4000;
  await app.listen(port);

  console.log(`UrbanRentisha backend running on http://localhost:${port}`);
}

bootstrap();

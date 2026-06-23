import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./configure-app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") ?? 4000;
  await app.listen(port);

  console.log(`UrbanRentisha backend running on http://localhost:${port}`);
}

bootstrap();

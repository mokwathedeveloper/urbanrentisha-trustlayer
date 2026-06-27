import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { requestContextMiddleware } from "./common/middleware/request-context.middleware";

/**
 * Shared middleware/pipe/CORS setup used by both the local dev server
 * (main.ts, app.listen()) and the Vercel serverless entrypoint
 * (api/index.ts, app.init() with no listen()) - kept in one place so the
 * two bootstrap paths can't drift apart.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get(ConfigService);

  // First, so every other piece of middleware/every request handler runs
  // inside the request-ID context.
  app.use(requestContextMiddleware);

  app.use(helmet());

  app.enableCors({
    origin: config.get<string>("CORS_ORIGIN")?.split(",") ?? [
      "http://localhost:3000",
    ],
    credentials: true,
  });

  app.setGlobalPrefix(config.get<string>("API_PREFIX") ?? "api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
}

import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/global-exception.filter';
import { ValidationException } from './core/filters/validation.exception';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api');
  setupSwagger(app);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = [];
        errors.forEach((error) => {
          if (!error.children.length) {
            errorMessages.push({
              field: error.property,
              message: Object.values(error.constraints)[0],
            });
          } else {
            error.children.forEach((nestedError) => {
              if (!nestedError.children.length) {
                errorMessages.push({
                  field: nestedError.property,
                  message: Object.values(nestedError.constraints)[0],
                });
              } else {
                nestedError.children.forEach((nestedOfNestedError) => {
                  errorMessages.push({
                    field: nestedOfNestedError.property,
                    message: Object.values(nestedOfNestedError.constraints)[0],
                  });
                });
              }
            });
          }
        });
        return new ValidationException(errorMessages);
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();

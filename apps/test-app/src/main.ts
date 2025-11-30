import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'my-secret',
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
}
bootstrap();

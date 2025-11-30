# NestJS Google OAuth

[![NPM Version](https://img.shields.io/npm/v/nestjs-google-oauth.svg)](https://www.npmjs.com/package/nestjs-google-oauth)
[![License](https://img.shields.io/npm/l/nestjs-google-oauth.svg)](https://github.com/mirzasaikatahmmed/nestjs-google-oauth/blob/main/LICENSE)
[![Build Status](https://github.com/mirzasaikatahmmed/nestjs-google-oauth/actions/workflows/ci-publish.yml/badge.svg)](https://github.com/mirzasaikatahmmed/nestjs-google-oauth/actions)

A simple, robust, and easy-to-use NestJS package for integrating Google OAuth 2.0 authentication.

## Features

- 🚀 **Easy Integration**: Plug and play with your NestJS application.
- 🔒 **Secure**: Built on top of `passport-google-oauth20`.
- ⚙️ **Configurable**: Supports asynchronous configuration (e.g., using `@nestjs/config`).
- 📦 **Session Support**: Built-in session serialization.
- 🧩 **Type Safe**: Written in TypeScript with full type definitions.

## Installation

```bash
npm install nestjs-google-oauth
```

(Note: All necessary dependencies like `@nestjs/passport`, `passport`, etc. are installed automatically)

## Author

- **Name**: Mirza Saikat Ahmmed
- **Github**: [https://github.com/mirzasaikatahmmed](https://github.com/mirzasaikatahmmed)
- **Website**: [https://saikat.com.bd](https://saikat.com.bd)
- **Email**: [contact@saikat.com.bd](mailto:contact@saikat.com.bd)

## Usage

### 1. Configure Environment Variables

Create a `.env` file in your project root:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/redirect
```

### 2. Import the Module

Import `GoogleOauthModule` in your `AppModule`. We recommend using `registerAsync` with `@nestjs/config` to securely load credentials.

```typescript
import { Module } from '@nestjs/common';
import { GoogleOauthModule } from 'nestjs-google-oauth';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleOauthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
        callbackUrl: configService.get<string>('GOOGLE_CALLBACK_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### 3. Setup Session in `main.ts`

Ensure you configure `express-session` and `passport` in your `main.ts` file:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'your-secret-key', // Change this!
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
```

### 4. Test It!

Start your application and navigate to:
`http://localhost:3000/auth/google`

You will be redirected to Google to sign in. Upon success, you will be redirected back to your callback URL (default: `/auth/google/redirect`) and receive the user profile data.

## Configuration Options

The `register` and `registerAsync` methods accept the following options:

| Option | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Your Google Client ID. |
| `clientSecret` | `string` | Your Google Client Secret. |
| `callbackUrl` | `string` | The URL to redirect to after Google Login. |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

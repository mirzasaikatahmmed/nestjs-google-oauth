import { Module, DynamicModule, Provider } from '@nestjs/common';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { GoogleOauthController } from './google-oauth.controller';
import { SessionSerializer } from './session.serializer';
import { GoogleOauthOptions, GoogleOauthAsyncOptions, GoogleOauthOptionsFactory } from './interfaces/google-oauth-options.interface';
import { PassportModule } from '@nestjs/passport';

@Module({})
export class GoogleOauthModule {
  static register(options: GoogleOauthOptions): DynamicModule {
    return {
      module: GoogleOauthModule,
      imports: [PassportModule.register({ session: true })],
      controllers: [GoogleOauthController],
      providers: [
        {
          provide: 'GOOGLE_OAUTH_OPTIONS',
          useValue: options,
        },
        GoogleOauthStrategy,
        SessionSerializer,
      ],
      exports: [GoogleOauthStrategy, SessionSerializer],
    };
  }

  static registerAsync(options: GoogleOauthAsyncOptions): DynamicModule {
    return {
      module: GoogleOauthModule,
      imports: [
        ...options.imports || [],
        PassportModule.register({ session: true }),
      ],
      controllers: [GoogleOauthController],
      providers: [
        ...this.createAsyncProviders(options),
        GoogleOauthStrategy,
        SessionSerializer,
      ],
      exports: [GoogleOauthStrategy, SessionSerializer],
    };
  }

  private static createAsyncProviders(options: GoogleOauthAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: GoogleOauthAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: 'GOOGLE_OAUTH_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: 'GOOGLE_OAUTH_OPTIONS',
      useFactory: async (optionsFactory: GoogleOauthOptionsFactory) =>
        await optionsFactory.createGoogleOauthOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}

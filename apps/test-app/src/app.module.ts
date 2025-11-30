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
                callbackUrl: configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/auth/google/redirect',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule { }

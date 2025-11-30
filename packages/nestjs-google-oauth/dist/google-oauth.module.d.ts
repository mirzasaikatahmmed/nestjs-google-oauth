import { DynamicModule } from '@nestjs/common';
import { GoogleOauthOptions, GoogleOauthAsyncOptions } from './interfaces/google-oauth-options.interface';
export declare class GoogleOauthModule {
    static register(options: GoogleOauthOptions): DynamicModule;
    static registerAsync(options: GoogleOauthAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}

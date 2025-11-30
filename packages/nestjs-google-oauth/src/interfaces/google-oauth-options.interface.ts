import { ModuleMetadata, Type } from '@nestjs/common';

export interface GoogleOauthOptions {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
}

export interface GoogleOauthOptionsFactory {
    createGoogleOauthOptions(): Promise<GoogleOauthOptions> | GoogleOauthOptions;
}

export interface GoogleOauthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<GoogleOauthOptionsFactory>;
    useClass?: Type<GoogleOauthOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<GoogleOauthOptions> | GoogleOauthOptions;
    inject?: any[];
}

import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleOauthOptions } from './interfaces/google-oauth-options.interface';
declare const GoogleOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    constructor(options: GoogleOauthOptions);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};

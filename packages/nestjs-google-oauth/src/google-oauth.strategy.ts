import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, Inject } from '@nestjs/common';
import { GoogleOauthOptions } from './interfaces/google-oauth-options.interface';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(@Inject('GOOGLE_OAUTH_OPTIONS') options: GoogleOauthOptions) {
        super({
            clientID: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackUrl,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        console.log(user);
        done(null, user);
    }
}

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/google')
export class GoogleOauthController {
    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        // User is already validated by the strategy and serialized into session
        // Redirect or return user
        res.json(req.user);
    }
}

import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { Public } from './decorators/public.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post('signup')
    public async signUp(
        @Body() authDto: AuthDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<any> {
        const data = await this.authService.signUp(authDto);
        this.setRefreshTokenCookie(response, data.refresh_token)
        return data;
    }

    @Public()
    @UseGuards(ThrottlerGuard)
    @Post('signin')
    public async signIn(
        @Body() authDto: AuthDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<any> {
        const data = await this.authService.signIn(authDto);
        this.setRefreshTokenCookie(response, data.refresh_token)
        return data;
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('signout')
    public async signOut(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<any> {

        const { refresh } = request.cookies;
        await this.authService.signOut(refresh);
        response.clearCookie('refresh')
    }

    private setRefreshTokenCookie(response: Response, token: string): void {
        response.cookie('refresh', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    }
}

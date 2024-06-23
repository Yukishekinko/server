import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) { }

    public async signUp(dto: AuthDto) {
        const exists = await this.userService.getByLogin(dto.login);

        if (exists)
            throw new BadRequestException("Пользователь уже существует")

        const salt = await genSalt(10);
        const encrypted_password = await hash(dto.password, salt)

        const user = await this.userService.create(dto.login, encrypted_password);
        const tokens = await this.tokenService.generateTokens(dto);

        await this.tokenService.saveToken(user.id, tokens.refresh_token);
        return { ...tokens, user: { id: user.id, login: user.login, isStaff: user.isStaff } }
    }

    public async signIn(dto: AuthDto) {
        const exists = await this.userService.findUserByLoginOrThrow404(dto.login);

        const compared = await compare(dto.password, exists.password);

        if (!compared)
            throw new BadRequestException('Пароли не совпадают')

        const tokens = await this.tokenService.generateTokens(dto);
        await this.tokenService.saveToken(exists.id, tokens.refresh_token);

        return { ...tokens, user: { id: exists.id, login: exists.login, isStaff: exists.isStaff } }
    }

    public async signOut(refresh_token: string) {
        await this.tokenService.deleteToken(refresh_token);
    }
}

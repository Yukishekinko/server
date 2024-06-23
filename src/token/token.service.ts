import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from './dto/payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwt: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async generateTokens(payload: TokenPayloadDto) {
        const access_token = await this.jwt.signAsync(
            {
                sub: payload.login
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '12h',
            }
        )

        const refresh_token = await this.jwt.signAsync(
            {
                sub: payload.login
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '30d'
            }
        )

        return {
            access_token,
            refresh_token
        }
    }

    async saveToken(user_id: number, refresh_token: string) {
        const exists = await this.prisma.token.findUnique({ where: { userId: user_id } })

        if (exists) {
            const token = await this.prisma.token.update({
                where: {
                    userId: user_id
                },
                data: {
                    token: refresh_token,
                }
            })

            return token;
        }

        const token = await this.prisma.token.create({
            data: {
                token: refresh_token,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        })

        return token;
    }

    async deleteToken(refresh_token: string) {
        const exists = await this.prisma.token.findUnique({
            where: {
                token: refresh_token
            }
        })

        if(!exists)
            throw new BadRequestException('Токена не существует')

        const token = await this.prisma.token.delete({
            where: {
                token: refresh_token
            }
        })

        return token;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    public async findUserByLoginOrThrow404(login: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                login: login
            }
        })

        if(!user) throw new NotFoundException("Пользователь не найден")
            
        return user;
    }

    public async getByLogin(login: string) {
        return await this.prisma.user.findUnique({ where: { login: login } })
    }

    public async create(login: string, password: string) {
        return await this.prisma.user.create({ data: { login: login, password: password } })
    }
}

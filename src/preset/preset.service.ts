import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PresetService {

    constructor(private readonly prisma: PrismaService) { }

    async create(name: string, description: string, price: number, original: string, result: string, file: string) {
        return await this.prisma.preset.create({ data: { name: name, description: description, price: price, original: original, result: result, file: file } })
    }

    async getAll() {
        return await this.prisma.preset.findMany();
    }
}

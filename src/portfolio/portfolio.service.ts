import { Injectable } from '@nestjs/common';
import { createReadStream, unlink } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioService {

    constructor(private readonly prisma: PrismaService) { }

    async createPortfolio(name: string, published: boolean) {
        return await this.prisma.portfolio.create({ data: { name: name, published: published } })
    }

    async addPhotoToPortfolio(path: string, portfolioId: string) {
        return await this.prisma.portfolioPhoto.create({ data: { path: path, portfolioId: portfolioId } })
    }

    async imageBuffer(portfolioId: string) {
        const photos = await this.prisma.portfolioPhoto.findMany({ where: { portfolioId: portfolioId } });
        const files = [];

        photos.forEach((photo) => {
            files.push(createReadStream(`../server/uploads/${photo.path}`))
        })

        return files;
    }

    async getPortfolio(portfolioId: string) {
        return await this.prisma.portfolio.findFirst({ where: { id: portfolioId } })
    }

    async getAllPortfolios() {
        return await this.prisma.portfolio.findMany();
    }

    async getPortfolioPhotos(id: string) {
        return await this.prisma.portfolioPhoto.findMany({where: {portfolioId: id}})
    }

    async delete(portfolioId) {
        await this.deletePhotos(portfolioId)
        return await this.prisma.portfolio.delete({ where: { id: portfolioId.id } })
    }

    private async deletePhotos(portfolioId) {
        const photos = await this.prisma.portfolioPhoto.findMany({ where: { portfolioId: portfolioId.id } });
        photos.forEach(element => {
            unlink(`../server/uploads/${element.path}`, (error) => {
                if (error) throw error
                console.log('File has been deleted');
            })
        });
    }
}


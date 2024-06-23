import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { create } from 'archiver';
import { createReadStream, createWriteStream, existsSync, mkdir, unlink } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotosetService {
    constructor(private readonly prisma: PrismaService) { }

    async createPhotoset(name: string, type: string, date: string) {
        const date_object = new Date(date);
        return await this.prisma.photoset.create({ data: { name: name, date: date_object.toISOString(), type: type } })
    }

    async addPhotoToPhotoset(path: string, photosetId: string) {
        await this.prisma.photo.create({ data: { photosetId: photosetId, path: path } })
    }

    async imageBuffer(photosetId: string) {
        const photos = await this.prisma.photo.findMany({ where: { photosetId: photosetId } })
        const files = [];

        photos.forEach((photo) => {
            files.push(createReadStream(`../server/uploads/${photo.path}`))
        })

        return files;
    }

    async getAllPhotosets() {
        return await this.prisma.photoset.findMany();
    }

    async getPhotoset(photosetId: string) {
        const photoset = await this.prisma.photoset.findFirst({ where: { id: photosetId } });
        return photoset;
    }

    async getPhotosetPhotos(photosetId: string): Promise<Photo[]> {
        const photos = await this.prisma.photo.findMany({ where: { photosetId: photosetId } });
        return photos;
    }

    async download(photosetId: string) {
        const photos = await this.getPhotosetPhotos(photosetId);
        const outputPath = join(process.cwd(), 'archives', photosetId);

        if (!existsSync(outputPath)) {
            mkdir(outputPath, { recursive: true }, (err) => { if (err) throw err });
        }

        const output = createWriteStream(join(outputPath, 'archive.zip'));
        const zip = create('zip')

        zip.pipe(output);

        photos.forEach((photo) => {
            zip.append(createReadStream(`../server/uploads/${photo.path}`), { name: photo.path })
        })

        zip.finalize();
        return zip;
    }

    async delete(photosetId) {
        await this.deletePhotos(photosetId.id)
        return await this.prisma.photoset.delete({ where: { id: photosetId.id } })
    }

    private async deletePhotos(photosetId: string) {
        const photos = await this.prisma.photo.findMany({ where: { photosetId: photosetId } });
        photos.forEach(element => {
            unlink(`../server/uploads/${element.path}`, (error) => {
                if (error) throw error
                console.log('File has been deleted');
            })
        });
    }
}

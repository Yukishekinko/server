import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) {
            return true;
        }

        if (!token)
            throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET,
            })

            request['user'] = payload;
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException()
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtservice: JwtService) { };

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            throw new UnauthorizedException("Token Not Found");

        }

        const token = authHeader.split(" ")[1];

        try {
            const payload = this.jwtservice.verify(token, {
                secret: process.env.JWT_SECRET
            });

            request.user = payload;

            return true;

        } catch (error) {

            console.error("JWT VERIFY ERROR:", error);

            throw new UnauthorizedException("Invalid Token");

        }

    };

};
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserPayload } from "./interfaces/user-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "your-super-secret-jwt-key",
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    roles: string[];
  }): Promise<UserPayload> {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}

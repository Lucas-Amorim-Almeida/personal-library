import InternalServerError from "@/infra/http/Errors/InternalServerError";
import { JWTPayload, TokenManager } from "@/infra/http/interfaces/TokenManager";
import * as jwt from "jsonwebtoken";

export default class JsonWebToken implements TokenManager {
  private readonly secretAccess = process.env.TOKEN_SECRET;
  private readonly EXPIRATION = "8h";

  tokenGenerator(payload: JWTPayload): string {
    if (!this.secretAccess) {
      throw new InternalServerError();
    }

    const token = jwt.sign(payload, this.secretAccess, {
      expiresIn: this.EXPIRATION,
    });

    return token;
  }

  tokenReader(token: string): JWTPayload {
    if (!this.secretAccess) {
      throw new InternalServerError();
    }

    const { id, access_level, status } = jwt.verify(
      token,
      this.secretAccess,
    ) as JWTPayload;

    return { id, access_level, status };
  }
}

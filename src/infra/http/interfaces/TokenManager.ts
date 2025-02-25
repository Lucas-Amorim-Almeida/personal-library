export interface JWTPayload {
  id: string;
  access_level: string;
  status: string;
}
export interface TokenManager {
  tokenGenerator(payload: JWTPayload): string;
  tokenReader(token: string): JWTPayload;
}

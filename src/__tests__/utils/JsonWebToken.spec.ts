import InternalServerError from "@/infra/http/Errors/InternalServerError";
import JsonWebToken from "@/utils/JsonWebToken";
import * as jwt from "jsonwebtoken";

const payload = { id: "123", access_level: "common", status: "ativo" };

describe("JsonWebToken", () => {
  const mockSecret = "test_secret";
  let jsonWebToken: JsonWebToken;

  beforeEach(() => {
    process.env.TOKEN_SECRET = mockSecret;
    jsonWebToken = new JsonWebToken();
  });

  afterEach(() => {
    delete process.env.TOKEN_SECRET;
  });

  describe("tokenGenerator", () => {
    it("Should return a valid token.", () => {
      const token = jsonWebToken.tokenGenerator(payload);
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });

    it("Should throws an error of InternalServerError, when secret is undefined.", () => {
      delete process.env.TOKEN_SECRET;
      jsonWebToken = new JsonWebToken();
      expect(() => jsonWebToken.tokenGenerator(payload)).toThrow(
        InternalServerError,
      );
    });
  });

  describe("tokenReader", () => {
    it("Should return a valid payload when token is valid.", () => {
      const token = jwt.sign(payload, mockSecret, { expiresIn: "8h" });
      const decoded = jsonWebToken.tokenReader(token);
      expect(decoded).toEqual(payload);
    });

    it("Should throws an error of InternalServerError, when secret is undefined.", () => {
      delete process.env.TOKEN_SECRET;
      jsonWebToken = new JsonWebToken();
      expect(() => jsonWebToken.tokenReader("invalid_token")).toThrow(
        InternalServerError,
      );
    });

    it("Shoul trows an error when try decode a invalid token.", () => {
      expect(() => jsonWebToken.tokenReader("invalid_token")).toThrow(
        jwt.JsonWebTokenError,
      );
    });
  });
});

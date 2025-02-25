import Bcrypt from "@/utils/Bcrypt";
import * as bcrypt from "bcrypt";

describe("Bcrypt Cryptography", () => {
  let bcryptInstance: Bcrypt;
  beforeEach(() => {
    bcryptInstance = new Bcrypt("testPassword");
  });

  it("deve criptografar a senha corretamente", async () => {
    jest.spyOn(bcrypt, "genSalt").mockResolvedValue("fakeSalt" as never);
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword" as never);

    const hash = await bcryptInstance.encrypt();

    expect(hash).toBe("hashedPassword");
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("testPassword", "fakeSalt");
  });

  it("deve comparar corretamente a senha com o hash", async () => {
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    const result = await bcryptInstance.compare("hashedPassword");

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "testPassword",
      "hashedPassword",
    );
  });
});

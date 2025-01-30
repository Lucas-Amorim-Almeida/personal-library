import Cryptography from "@/domain/application/accessories/Cryptography";
import * as bcrypt from "bcrypt";

export default class Bcrypt implements Cryptography {
  private plainText: string;

  constructor(plainText: string) {
    this.plainText = plainText;
  }

  setPlainText(newPlainText: string): void {
    this.plainText = newPlainText;
  }

  async encrypt() {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.plainText, salt);

    return hash;
  }

  async compare(encryptedText: string) {
    const compResult = await bcrypt.compare(this.plainText, encryptedText);
    return compResult;
  }
}

export default interface Cryptography {
  //  private plainText: string;//deve ter uma dessa mas o typescript não permite o private
  encrypt(): Promise<string>;
  compare(encryptedText: string): Promise<boolean>;
  setPlainText(newPlainText: string): void;
}

export default class Email {
  private readonly EMAIL_REGEX = /\S+@\S+\.\S+/;
  constructor(private email: string) {
    if (!this.validate(email)) throw new Error("Email is not valid.");
  }

  set(email: string): void {
    if (!this.validate(email)) throw new Error("Email is not valid.");

    this.email = email;
  }

  get(): string {
    return this.email;
  }

  private validate(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }
}

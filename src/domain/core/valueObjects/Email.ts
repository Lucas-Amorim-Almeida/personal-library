import EmailError from "../Errors/UserErrors/EmailError";

export default class Email {
  private readonly EMAIL_REGEX = /\S+@\S+\.\S+/;
  constructor(private email: string) {
    if (!this.validate(email)) throw new EmailError();
  }

  set(email: string): void {
    if (!this.validate(email)) throw new EmailError();

    this.email = email;
  }

  get(): string {
    return this.email;
  }

  private validate(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }
}

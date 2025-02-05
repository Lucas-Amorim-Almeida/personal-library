import PhoneError from "../Errors/UserErrors/PhoneError";

export default class Phone {
  private readonly PHONE_REGEX = /^\+\d{1,3}\d{10,15}$/;

  constructor(private phone: string) {
    if (!this.validate(phone)) {
      throw new PhoneError();
    }
  }

  private validate(phone: string): boolean {
    return this.PHONE_REGEX.test(phone);
  }

  set(phone: string): void {
    if (!phone || !this.validate(phone)) {
      throw new PhoneError();
    }
    this.phone = phone;
  }

  get(): string {
    return this.phone;
  }
}

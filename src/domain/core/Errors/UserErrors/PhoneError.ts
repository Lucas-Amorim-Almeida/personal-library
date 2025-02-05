export default class PhoneError extends Error {
  constructor() {
    super("Phone number is not valid.");
  }
}

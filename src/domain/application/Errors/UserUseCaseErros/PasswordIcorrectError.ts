export default class PasswordIcorrectError extends Error {
  constructor() {
    super("Password is incorrect.");
  }
}

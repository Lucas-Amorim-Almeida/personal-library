export default class ChangePasswordError extends Error {
  constructor() {
    super("An error occurred while changing the password.");
  }
}

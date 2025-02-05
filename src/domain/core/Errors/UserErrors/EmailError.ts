export default class EmailError extends Error {
  constructor() {
    super("Email is not valid.");
  }
}

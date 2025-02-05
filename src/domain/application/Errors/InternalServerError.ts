export default class InternalServerError extends Error {
  constructor() {
    super("An internal server error occurred.");
  }
}

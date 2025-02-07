import HTTPError from "./HTTPError";

export default class InternalServerError extends HTTPError {
  constructor() {
    super("An internal server error occurred.", 500);
  }
}

import HTTPError from "./HTTPError";

export default class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404);
  }
}

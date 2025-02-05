export default class UtilsErrors extends Error {
  constructor(message: string) {
    super(`${message} is not valid.`);
  }
}

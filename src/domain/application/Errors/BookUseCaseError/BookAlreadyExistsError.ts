export default class BookAlreadyExistsError extends Error {
  constructor() {
    super("The Book already exists in the database.");
  }
}

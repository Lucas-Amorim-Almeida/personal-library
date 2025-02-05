export default class CollectionIdError extends Error {
  constructor() {
    super("Collection ID is not valid.");
  }
}

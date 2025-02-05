export default class NotFoundError extends Error {
  constructor(entityName: string) {
    super(`${entityName} not found.`);
  }
}

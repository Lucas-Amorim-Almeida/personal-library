export default class NotAvailableError extends Error {
  constructor(entityName: string) {
    super(`${entityName} is not available.`);
  }
}

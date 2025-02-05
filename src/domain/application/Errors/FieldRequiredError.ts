export default class FieldRequiredError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} is required.`);
  }
}

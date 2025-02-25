export default interface HTTPResponse {
  statusCode: number;
  body?: unknown;
  readonly isTokenGenRequired?: boolean;
}

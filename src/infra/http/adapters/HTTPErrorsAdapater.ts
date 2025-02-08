import errorMap from "../Errors/ErrorsMapping";
import HTTPError from "../Errors/HTTPError";
import InternalServerError from "../Errors/InternalServerError";

export default class HTTPErrorsAdapater {
  constructor(private readonly error: Error) {}

  handle(): HTTPError {
    const ErrorClassData = errorMap.get(
      this.error.constructor as ErrorConstructor,
    );
    if (ErrorClassData) {
      const [ErrorClass, statusCode] = ErrorClassData;
      return new ErrorClass(this.error.message, statusCode);
    }
    return new InternalServerError();
  }
}

import FieldRequiredError from "@/domain/application/Errors/FieldRequiredError";
import BadRequestError from "./BadRequestError";
import HTTPError from "./HTTPError";
import NotFoundError from "./NotFoundError";
import InvalidFieldError from "@/domain/application/Errors/InvalidFieldError";
//import NotAvailableError from "@/domain/application/Errors/NotAvailableError";
import EmailError from "@/domain/core/Errors/UserErrors/EmailError";
import PhoneError from "@/domain/core/Errors/UserErrors/PhoneError";
import CollectionIdError from "@/domain/core/Errors/CollectionErrors/CollectionIdError";
import UserAlreadyRegisteredError from "@/domain/application/Errors/UserUseCaseErros/UserAlreadyRegisteredError";
import PasswordIcorrectError from "@/domain/application/Errors/UserUseCaseErros/PasswordIcorrectError";
import BookAlreadyExistsError from "@/domain/application/Errors/BookUseCaseError/BookAlreadyExistsError";
import EntityNotFoundError from "@/domain/application/Errors/EntityNotFoundError";

// Define um tipo para representar classes de erro
//eslint-disable-next-line
type ErrorConstructor = new (...args: any[]) => Error;

// Mapeia classes de erro para classes de HTTPError correspondentes
const errorMap = new Map<ErrorConstructor, [typeof HTTPError, number]>([
  [FieldRequiredError, [BadRequestError, 400]],
  [InvalidFieldError, [BadRequestError, 400]],
  //[NotAvailableError, [BadRequestError, 400]],
  [EmailError, [BadRequestError, 400]],
  [PhoneError, [BadRequestError, 400]],
  [CollectionIdError, [BadRequestError, 400]],
  [UserAlreadyRegisteredError, [BadRequestError, 400]],
  [PasswordIcorrectError, [BadRequestError, 400]],
  [BookAlreadyExistsError, [BadRequestError, 400]],
  [EntityNotFoundError, [NotFoundError, 404]],
]);

export default errorMap;

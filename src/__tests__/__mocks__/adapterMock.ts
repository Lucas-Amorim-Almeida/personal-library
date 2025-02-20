import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import { UserParamsType } from "@/domain/core/@types/types";
import Presenter from "@/infra/adapters/interfaces/Presenter";
import { repositoryMock, userInputExample } from "./mocks";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import Book from "@/domain/core/Book";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import { inputBookUpdateExample } from "./bookMock";
import {
  ColletionInputData,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";
import { inputCollectionExample } from "./collectionMock";

export const presenterMock: jest.Mocked<Presenter> = {
  output: jest.fn(),
};

export const userUseCaseMock: jest.Mocked<
  UseCase<UserParamsType, DBOutputUserData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

export const bookUseCaseMock: jest.Mocked<UseCase<Book, DBOutputBookData>> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

export const collectionUseCaseMock: jest.Mocked<
  UseCase<ColletionInputData, DBOutputCollectionData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};

export const httpRequestMockUser: jest.Mocked<HTTPRequest> = {
  body: userInputExample,
};

export const httpRequestMockBook: jest.Mocked<HTTPRequest> = {
  body: inputBookUpdateExample,
};

export const httpRequestMockCollection: jest.Mocked<HTTPRequest> = {
  body: inputCollectionExample,
};

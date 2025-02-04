import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UseCase from "@/domain/application/UseCase";
import { UserParamsType } from "@/domain/core/@types/types";
import Presenter from "@/infra/adapters/interfaces/Presenter";
import { repositoryMock, userInputExample } from "./mocks";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";

export const presenterMock: jest.Mocked<Presenter> = {
  output: jest.fn(),
};

export const userUseCaseMock: jest.Mocked<
  UseCase<UserParamsType, DBOutputUserData>
> = {
  repository: repositoryMock,
  execute: jest.fn(),
};
export const httpRequestMock: jest.Mocked<HTTPRequest> = {
  body: userInputExample,
};

import Repository from "@/domain/core/Repository";
import User from "@/domain/core/User";
import { UserParamsType } from "@/domain/core/@types/types";
import UserOutputBoundary from "../UserOutputBoundary";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import UseCase from "../../UseCase";
import Cryptography from "../../accessories/Cryptography";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import InternalError from "../../Errors/InternalError";
import UserAlreadyRegisteredError from "../../Errors/UserUseCaseErros/UserAlreadyRegisteredError";

export default class CreateUser
  implements UseCase<UserParamsType, DBOutputUserData>
{
  constructor(
    readonly repository: Repository,
    private encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<UserParamsType>,
  ): Promise<OutputBoundary<DBOutputUserData>[]> {
    const userData = inputData.get();

    const dbQueryResponse: DBOutputUserData | null =
      await this.repository.getOne({
        username: userData.username,
      });
    if (dbQueryResponse) throw new UserAlreadyRegisteredError();

    const newUser = new User(userData);

    const encryptedPassword = await this.passwordEncryper(
      newUser.get().password,
    );
    newUser.setPassword(encryptedPassword);

    const savedUser: DBOutputUserData | null =
      await this.repository.save(newUser);

    if (!savedUser) throw new InternalError();

    return [new UserOutputBoundary(savedUser)];
  }

  private async passwordEncryper(plainPassword: string): Promise<string> {
    this.encrypter.setPlainText(plainPassword);
    const encryptedPassword = await this.encrypter.encrypt();
    return encryptedPassword;
  }
}

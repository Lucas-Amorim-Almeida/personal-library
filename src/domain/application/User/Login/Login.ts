import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import Repository from "@/domain/core/Repository";
import Cryptography from "../../accessories/Cryptography";
import UserStatus from "@/domain/core/UserStatus";
import UseCase from "../../UseCase";

import UserOutputBoundary from "../UserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import NotAvailableError from "../../Errors/NotAvailableError";
import PasswordIcorrectError from "../../Errors/UserUseCaseErros/PasswordIcorrectError";

export default class Login
  implements UseCase<{ username: string; password: string }, DBOutputUserData>
{
  constructor(
    readonly repository: Repository,
    private encypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<{ username: string; password: string }>,
  ): Promise<OutputBoundary<DBOutputUserData>[]> {
    const data = inputData.get();

    const userData: DBOutputUserData | null = await this.repository.getOne({
      username: data.username,
    });

    if (!userData) throw new EntityNotFoundError("User");
    if (userData.status == UserStatus.TO_DELETE)
      throw new NotAvailableError("User");

    const isUserValid = await this.userValidate(
      data.password,
      userData.password,
    );
    if (!isUserValid) throw new PasswordIcorrectError();

    return [new UserOutputBoundary(userData)];
  }

  private async userValidate(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    this.encypter.setPlainText(plainPassword);
    const passwordComparation = await this.encypter.compare(encryptedPassword);

    return passwordComparation;
  }
}

import Repository from "@/domain/core/Repository";
import Cryptography from "../../accessories/Cryptography";
import OutputBoundary from "../../OutputBoundary";
import InputBoundary from "../../InputBoundary";
import UseCase from "../../UseCase";
import UserOutputBoundary from "../UserOutputBoundary";
import {
  DBOutputUserData,
  InputChangePassword,
} from "@/domain/application/@types/UserTypes";
import NotFoundError from "../../Errors/NotFoundError";
import PasswordIcorrectError from "../../Errors/UserUseCaseErros/PasswordIcorrectError";
import InternalServerError from "../../Errors/InternalServerError";

export default class ChangePassword
  implements UseCase<InputChangePassword, DBOutputUserData>
{
  constructor(
    readonly repository: Repository,
    private readonly encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<InputChangePassword>,
  ): Promise<OutputBoundary<DBOutputUserData>[]> {
    const { id, current_password, new_password } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new NotFoundError("User");
    }

    const isSamePassword = await this.passwordValidation(
      current_password,
      dbUser.password,
    );
    if (!isSamePassword) {
      throw new PasswordIcorrectError();
    }

    const encryptedPassword = await this.passwordEncryper(new_password);
    const updatedUser: DBOutputUserData | null = await this.repository.update({
      query: { id },
      update_fields: { password: encryptedPassword },
    });
    if (!updatedUser) {
      throw new InternalServerError();
    }

    return [new UserOutputBoundary(updatedUser)];
  }

  private async passwordValidation(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    this.encrypter.setPlainText(plainPassword);
    const passwordComparison = await this.encrypter.compare(encryptedPassword);
    return passwordComparison;
  }

  private async passwordEncryper(plainPassword: string): Promise<string> {
    this.encrypter.setPlainText(plainPassword);
    const encryptedPassword = await this.encrypter.encrypt();
    return encryptedPassword;
  }
}

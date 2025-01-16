import Repository from "@/core/Repository";
import Cryptography from "../../accessories/Cryptography";
import OutputBoundary from "../../OutputBoundary";
import User from "@/core/User";
import InputBoundary from "../../InputBoundary";
import UseCase from "../../UseCase";
import { DBOutputUserData } from "@/application/@types/applicationTypes";
import UserOutputBoundary from "../UserOutputBoundary";

type InputParams = {
  id: string;
  current_password: string;
  new_password: string;
};

export default class ChangePassword implements UseCase<InputParams, User> {
  constructor(
    readonly repository: Repository,
    private readonly encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<InputParams>,
  ): Promise<OutputBoundary<User>> {
    const { id, current_password, new_password } = inputData.get();

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      id,
    });
    if (!dbUser) {
      throw new Error("User not found.");
    }

    const isSamePassword = await this.passwordValidation(
      current_password,
      dbUser.password,
    );
    if (!isSamePassword) {
      throw new Error("The current password is incorrect.");
    }

    const encryptedPassword = await this.passwordEncryper(new_password);
    const updatedUser: DBOutputUserData | null = await this.repository.update({
      id,
      password: encryptedPassword,
    });
    if (!updatedUser) {
      throw new Error("An internal server error occurred.");
    }

    return new UserOutputBoundary(updatedUser);
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

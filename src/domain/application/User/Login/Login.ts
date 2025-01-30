import User from "@/domain/core/User";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import Repository from "@/domain/core/Repository";
import Cryptography from "../../accessories/Cryptography";
import UserStatus from "@/domain/core/UserStatus";
import UseCase from "../../UseCase";

import UserOutputBoundary from "../UserOutputBoundary";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";

export default class Login
  implements UseCase<{ username: string; password: string }, User>
{
  constructor(
    readonly repository: Repository,
    private encypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<{ username: string; password: string }>,
  ): Promise<OutputBoundary<User>[]> {
    const data = inputData.get();

    const userData: DBOutputUserData | null = await this.repository.getOne({
      username: data.username,
    });

    if (!userData) throw new Error("User not found.");
    if (userData.status != UserStatus.ACTIVE)
      throw Error("User is not available.");

    const isUserValid = await this.userValidate(
      data.password,
      userData.password,
    );
    if (!isUserValid) throw new Error("Password is incorrect.");

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

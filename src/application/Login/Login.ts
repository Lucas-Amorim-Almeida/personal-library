import User from "@/core/User";
import InputBoundary from "../InputBondary";
import OutputBoundary from "../OutputBoundary";
import UserRepository from "@/core/repositories/UserRepository";
import LoginOutputBoundary from "./LoginOutputBoundary";
import Cryptography from "../accessories/Cryptography";
import UserStatus from "@/core/UserStatus";
import UseCase from "../UseCase";

export default class Login
  implements UseCase<{ username: string; password: string }, User>
{
  constructor(
    readonly repository: UserRepository,
    private encypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<{ username: string; password: string }>,
  ): Promise<OutputBoundary<User>> {
    const data = inputData.get();

    const userData: {
      id: string;
      status: string;
      username: string;
      password: string;
      access_level: string;
      created_at?: Date;
      updated_at?: Date;
    } | null = await this.repository.getOne({ username: data.username });

    if (!userData) throw new Error("User not found.");
    if (userData.status != UserStatus.ACTIVE)
      throw Error("User is not available.");

    const isUserValid = await this.userValidate(
      data.password,
      userData.password,
    );
    if (!isUserValid) throw new Error("Password is incorrect.");

    return new LoginOutputBoundary(userData);
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

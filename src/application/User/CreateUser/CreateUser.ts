import Repository from "@/core/Repository";
import User from "@/core/User";
import { UserParamsType } from "@/core/@types/types";
import CreateUserOutputBoundary from "./CreateUserOutputBoundary";
import InputBoundary from "../../InputBoundary";
import OutputBoundary from "../../OutputBoundary";
import UseCase from "../../UseCase";
import Cryptography from "../../accessories/Cryptography";
import { DBOutputUserData } from "@/application/@types/applicationTypes";

export default class CreateUser implements UseCase<UserParamsType, User> {
  constructor(
    readonly repository: Repository,
    private encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<UserParamsType>,
  ): Promise<OutputBoundary<User>> {
    const userData = inputData.get();
    const dbQueryResponse: DBOutputUserData | null =
      await this.repository.getOne({
        username: userData.username,
      });
    if (dbQueryResponse) throw new Error("User already registered.");

    const newUser = new User(userData);

    const encryptedPassword = await this.passwordEncryper(
      newUser.get().password,
    );
    newUser.setPassword(encryptedPassword);

    const savedUser: DBOutputUserData | null =
      await this.repository.save(newUser);

    if (!savedUser) throw new Error("An internal server error occurred.");

    return new CreateUserOutputBoundary(savedUser);
  }

  private async passwordEncryper(plainPassword: string): Promise<string> {
    this.encrypter.setPlainText(plainPassword);
    const encryptedPassword = await this.encrypter.encrypt();
    return encryptedPassword;
  }
}

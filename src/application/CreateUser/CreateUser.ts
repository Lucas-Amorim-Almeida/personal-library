import UserRepository from "@/core/repositories/UserRepository";
import User from "@/core/User";
import { UserParamsType } from "@/core/@types/types";
import CreateUserOutputBoundary from "./CreateUserOutputBoundary";
import InputBoundary from "../InputBondary";
import OutputBoundary from "../OutputBoundary";
import CreationObject from "../CreationObject";
import Cryptography from "../accessories/Cryptography";

export default class CreateUser
  implements CreationObject<UserParamsType, User>
{
  constructor(
    readonly userRepository: UserRepository,
    private encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<UserParamsType>,
  ): Promise<OutputBoundary<User>> {
    const userData = inputData.get();
    const dbQueryResponse = await this.userRepository.getOne(userData.username);
    if (dbQueryResponse) throw new Error("User already registered.");

    const newUser = new User(userData);

    const encryptedPassword = await this.passwordEncryper(
      newUser.get().password,
    );
    newUser.setPassword(encryptedPassword);

    const savedUser: {
      id: string;
      status: string;
      username: string;
      password: string;
      access_level: string;
      created_at?: Date;
      updated_at?: Date;
    } = await this.userRepository.save(newUser);

    if (!savedUser) throw new Error("An internal server error occurred.");

    return new CreateUserOutputBoundary(savedUser);
    // const output = new CreateUserOutputBoundary(savedUser);

    // return output.get();
  }

  private async passwordEncryper(plainPassword: string): Promise<string> {
    this.encrypter.setPlainText(plainPassword);
    const encryptedPassword = await this.encrypter.encrypt();
    return encryptedPassword;
  }
}

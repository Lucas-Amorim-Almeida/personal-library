import UserRepository from "@/core/repositories/UserRepository";
import User from "@/core/User";
import { UserParamsType } from "@/core/@types/types";
import CreateUserOutputBoundary from "./CreateUserOutputBoundary";
import InputBoundary from "../InputBondary";
import OutputBoundary from "../OutputBoundary";
import CreationObject from "../CreationObject";

export default class CreateUser
  implements CreationObject<UserParamsType, User>
{
  constructor(readonly userRepository: UserRepository) {}

  async execute(
    inputData: InputBoundary<UserParamsType>,
  ): Promise<OutputBoundary<User>> {
    const userData = inputData.get();
    const dbQueryResponse = await this.userRepository.getOne(userData.username);
    if (dbQueryResponse) throw new Error("User already registered.");

    const newUser = new User(userData);
    const savedUser: UserParamsType & { id: string } =
      await this.userRepository.save(newUser);

    if (!savedUser) throw new Error("An internal server error occurred.");

    return new CreateUserOutputBoundary(savedUser);
    // const output = new CreateUserOutputBoundary(savedUser);

    // return output.get();
  }
}

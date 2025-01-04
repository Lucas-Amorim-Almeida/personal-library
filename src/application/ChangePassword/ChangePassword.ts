import UserRepository from "@/core/repositories/UserRepository";
import Cryptography from "../accessories/Cryptography";
import OutputBoundary from "../OutputBoundary";
import User from "@/core/User";
import InputBoundary from "../InputBondary";
import ChangePasswordOutputBoundary from "./ChangePasswordOutputBoundary";

type InputParams = {
  id: string;
  current_password: string;
  new_password: string;
};

type dbOutputData = {
  id: string;
  status: string;
  username: string;
  password: string;
  access_level: string;
  created_at?: Date;
  updated_at?: Date;
} | null;

export default class ChangePassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Cryptography,
  ) {}

  async execute(
    inputData: InputBoundary<InputParams>,
  ): Promise<OutputBoundary<User>> {
    const { id, current_password, new_password } = inputData.get();

    const dbUser: dbOutputData = await this.userRepository.getOne({ id });
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
    const updatedUser: dbOutputData = await this.userRepository.update({
      id,
      password: encryptedPassword,
    });
    if (!updatedUser) {
      throw new Error("An internal server error occurred.");
    }

    return new ChangePasswordOutputBoundary(updatedUser);
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

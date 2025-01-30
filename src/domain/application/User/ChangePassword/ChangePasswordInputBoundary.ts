import { InputChangePassword } from "@/domain/application/@types/UserTypes";
import InputBoundary from "../../InputBoundary";

export default class ChangePasswordInputBoundary
  implements InputBoundary<InputChangePassword>
{
  constructor(private readonly inputParams: InputChangePassword) {}

  get(): InputChangePassword {
    return this.inputParams;
  }
}

import InputBoundary from "../../InputBoundary";

type InputParams = {
  id: string;
  current_password: string;
  new_password: string;
};

export default class ChangePasswordInputBoundary
  implements InputBoundary<InputParams>
{
  constructor(private readonly inputParams: InputParams) {}

  get(): InputParams {
    return this.inputParams;
  }
}

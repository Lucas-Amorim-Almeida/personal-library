import InputBoundary from "../../InputBoundary";

type InputParams = { id: string };

export default class RemoveUserInputBoundary
  implements InputBoundary<InputParams>
{
  constructor(private readonly inputData: InputParams) {}

  get(): InputParams {
    return this.inputData;
  }
}

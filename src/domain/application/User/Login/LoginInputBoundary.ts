import InputBoundary from "../../InputBoundary";
export default class LoginInputBoundary
  implements InputBoundary<{ username: string; password: string }>
{
  constructor(private inputData: { username: string; password: string }) {}

  get(): { username: string; password: string } {
    return this.inputData;
  }
}

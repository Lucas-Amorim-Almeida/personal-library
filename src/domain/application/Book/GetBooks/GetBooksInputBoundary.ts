import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";

export default class GetBooksInputBoundary
  implements InputBoundary<{ take?: number }>
{
  constructor(readonly inputData: { take?: number }) {
    if (inputData.take !== undefined && inputData.take <= 0) {
      throw new InvalidFieldError("take param");
    }
    /*Quando o inputData.take = 0 o innputData.take vem como falsy.
    Se fizesse !inputData.take || inputData.take <= 0 o if pegaria os caso em que não temos o take,
    pois quero que quando o take não for fornecido, um .getAll seja executado
    */
  }

  get(): { take?: number } {
    return this.inputData;
  }
}

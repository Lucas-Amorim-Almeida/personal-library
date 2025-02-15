import InputBoundary from "@/domain/application/InputBoundary";
import { DBOutputBookData } from "../@types/BookTypes";

export default class BookOutputBoundary
  implements InputBoundary<DBOutputBookData>
{
  constructor(private readonly data: DBOutputBookData) {}

  get(): DBOutputBookData {
    return this.data;
  }
}

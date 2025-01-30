import Repository from "@/domain/core/Repository";
import InputBoundary from "./InputBoundary";
import OutputBoundary from "./OutputBoundary";

export default interface UseCase<T, S> {
  readonly repository: Repository;
  execute(inputData: InputBoundary<T>): Promise<OutputBoundary<S>[]>;
}

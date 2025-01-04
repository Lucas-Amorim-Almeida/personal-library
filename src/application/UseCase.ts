import UserRepository from "@/core/repositories/UserRepository";
import InputBoundary from "./InputBondary";
import OutputBoundary from "./OutputBoundary";

export default interface UseCase<T, S> {
  readonly repository: UserRepository;
  execute(inputData: InputBoundary<T>): Promise<OutputBoundary<S>>;
}

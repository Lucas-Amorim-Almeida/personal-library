import UserRepository from "@/core/repositories/UserRepository";
import InputBoundary from "./InputBondary";
import OutputBoundary from "./OutputBoundary";

export default interface CreationObject<T, S> {
  readonly userRepository: UserRepository;
  execute(inputData: InputBoundary<T>): Promise<OutputBoundary<S>>;
}

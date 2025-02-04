export default interface Presenter {
  output<T>(data: T): object;
}

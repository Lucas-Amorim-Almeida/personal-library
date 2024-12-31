export default interface OutputBoundary<S> {
  // readonly output: S;
  get(): S;
}

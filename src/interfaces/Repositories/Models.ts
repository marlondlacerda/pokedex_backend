interface Model<T> {
  read(): Promise<T[]>,
}

export default Model;

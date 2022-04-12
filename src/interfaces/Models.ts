interface Model<T> {
  read(): Promise<T[]>,
  create(obj: T): Promise<T>,
}

export default Model;

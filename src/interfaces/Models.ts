interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T | T[]>;
}

export default Model;

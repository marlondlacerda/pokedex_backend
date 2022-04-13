interface Model<T> {
  read(): Promise<T | T[]>;
  create(obj: T): Promise<T>,
}

export default Model;

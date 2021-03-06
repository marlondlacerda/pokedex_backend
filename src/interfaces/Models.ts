interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T | T[]>;
  readOne(_id: number): Promise<T | null>;
  update(_id: number, obj: T): Promise<T | null>,
  partialUpdate(_id: number, obj: T): Promise<T | null>;
  delete(id: number): Promise<T | null>,
}

export default Model;

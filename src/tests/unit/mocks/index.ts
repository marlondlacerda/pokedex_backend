import pokeApi from "./pokeApi.json"

export const User = [{
  email: 'miltin@test.com',
  password: '$2a$12$ifQBYVJdfhAxsfZjYYpl5uCOAMVk8eDjHCT2KTU.9a9EdGQ3PaK.S'
}]

const mockCreate = (
  Instance: typeof pokeApi | typeof User,
  data: any,
  ) => {
    if (!data) {
      return;
    }

    const newData = data;

    Instance.push(data);
    return newData;
};

const mockFindOne = (
  Instance: typeof User | typeof pokeApi,
  where: any,
  ) => {
  if (!where) {
    return Instance[0];
  }

  let result: any;

    const index = Instance
      .findIndex((item: any) => item['email'] === where);

    if (index !== -1) {
      result = Instance[index];
    }

  return result;
};

export const Pokemon = {
  create: async (data: any) => mockCreate(pokeApi, data),
};

export const Login = {
  readOne: async (where: any) => {
    return mockFindOne(User, where)
  },
}

export default pokeApi;

import pokeApi from "./pokeApi.json"

const mockCreate = (Instance: typeof pokeApi, data: any) => {
  if (!data) {
    return;
  }

  const newData = data;

  Instance.push(data);
  return newData;
};

export const Pokemon = {
  create: async (data: any) => mockCreate(pokeApi, data),
};

export default pokeApi;

import { z } from 'zod';

const pokedexSchema = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome deve ser uma string',
  }),
  tipo: z.string({
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo deve ser uma string',
  }),
  hp: z.number({
    required_error: 'HP é obrigatório',
    invalid_type_error: 'HP deve ser um número',
  }),
  ataque: z.number({
    required_error: 'Ataque é obrigatório',
    invalid_type_error: 'Ataque deve ser um número',
  }),
  defesa: z.number({
    required_error: 'Defesa é obrigatório',
    invalid_type_error: 'Defesa deve ser um número',
  }),
  velocidade: z.number({
    required_error: 'Velocidade é obrigatório',
    invalid_type_error: 'Velocidade deve ser um número',
  }),
  total: z.number({
    required_error: 'Total é obrigatório',
    invalid_type_error: 'Total deve ser um número',
  }),
  habilidades: z.array(z.object({
    habilidade1: z.string({
      required_error: 'Habilidade 1 é obrigatório',
      invalid_type_error: 'Habilidade 1 deve ser uma string',
    }),
    habilidade2: z.string({
      required_error: 'Habilidade 2 é obrigatório',
      invalid_type_error: 'Habilidade 2 deve ser uma string',
    }),
  })).nonempty({
    message: 'Habilidades devem ser um array de objetos',
  }),
  img: z.string({
    required_error: 'Imagem é obrigatório',
    invalid_type_error: 'Imagem deve ser uma string',
  }),
});

type Pokedex = z.infer<typeof pokedexSchema>;

export default Pokedex;
export { pokedexSchema };

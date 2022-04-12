import { z } from 'zod';

const pokedexSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome deve ser uma string',
  }),
  type: z.string({
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo deve ser uma string',
  }),
  height: z.string({
    required_error: 'Tamanho é obrigatório',
    invalid_type_error: 'HP deve ser uma string',
  }),
  description: z.string({
    required_error: 'Descrição é obrigatório',
    invalid_type_error: 'Descrição deve ser uma string',
  }),
  baseStats: z.object({
    hp: z.number({
      required_error: 'HP é obrigatório',
      invalid_type_error: 'HP deve ser um número',
    }),
    atk: z.number({
      required_error: 'Ataque é obrigatório',
      invalid_type_error: 'Ataque deve ser um número',
    }),
    def: z.number({
      required_error: 'Defesa é obrigatório',
      invalid_type_error: 'Defesa deve ser um número',
    }),
    satk: z.number({
      required_error: 'Ataque especial é obrigatório',
      invalid_type_error: 'Ataque especial deve ser um número',
    }),
    sdef: z.number({
      required_error: 'Defesa especial é obrigatório',
      invalid_type_error: 'Defesa especial deve ser um número',
    }),
    spd: z.number({
      required_error: 'Velocidade é obrigatório',
      invalid_type_error: 'Velocidade deve ser um número',
    }),
  }),
  moves: z
    .object({
      ability1: z.string({
        required_error: 'Habilidade 1 é obrigatório',
        invalid_type_error: 'Habilidade 1 deve ser uma string',
      }),
      ability2: z.string({
        required_error: 'Habilidade 2 é obrigatório',
        invalid_type_error: 'Habilidade 2 deve ser uma string',
      }),
    }),
});

type Pokedex = z.infer<typeof pokedexSchema>;

export interface PokedexWithID extends Pokedex {
  id: number;
}

export default Pokedex;
export { pokedexSchema };

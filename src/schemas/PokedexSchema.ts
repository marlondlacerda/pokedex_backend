import { z } from 'zod';
import { numberSchema, stringSchema } from '../utils/createSchema';

const pokedexSchema = z.object({
  name: stringSchema('Name', 3, 10),

  type: z.array(
    stringSchema('Type', 3, 10),
  ).max(2).nonempty({
    message: 'Type must be a non-empty array',
  }),

  height: z.object({
    value: numberSchema('Height value'),
    measurement: stringSchema('Height measurement', 1, 3),
  }),

  weight: z.object({
    value: numberSchema('Weight value'),
    measurement: stringSchema('Weight measurement', 1, 3),
  }),

  description: stringSchema('Description', 5, 200),

  baseStats: z.object({
    hp: numberSchema('HP'),
    atk: numberSchema('ATK'),
    def: numberSchema('DEF'),
    satk: numberSchema('SATK'),
    sdef: numberSchema('SDEF'),
    spd: numberSchema('SPD'),
  }, {
    required_error: 'Base stats are required',
  }),

  moves: z
    .object({
      skill1: stringSchema('Skill 1', 3, 10),
      skill2: stringSchema('Skill 2', 3, 10),
    }, {
      required_error: 'Moves are required',
    }),

  image1: stringSchema('Image 1', 3, 200).url({
    message: 'Image 1 must be a valid URL',
  }),

  image2: stringSchema('Image 2', 3, 200).url({
    message: 'Image 2 must be a valid URL',
  }),
});

type Pokedex = z.infer<typeof pokedexSchema>;

export interface PokedexWithID extends Pokedex {
  id: number;
}

export default Pokedex;
export { pokedexSchema };

import { z } from 'zod';
import { numberSchema, stringSchema } from '../utils/createSchema';

export const pokedexSchema = z.object({
  name: stringSchema('Name', 3, 20),

  type: z.array(
    stringSchema('Type', 3, 20)
      .nonempty({
        message: 'Type must be a non-empty array',
      }),
    {
      required_error: 'Type is required',
      invalid_type_error: 'Type must be a array',
    },
  ),

  height: z.object({
    value: numberSchema('Height value'),
    measurement: stringSchema('Height measurement', 1, 3),
  }, {
    required_error: 'Height is required',
    invalid_type_error: 'Height must be an object',
  }),

  weight: z.object({
    value: numberSchema('Weight value'),
    measurement: stringSchema('Weight measurement', 1, 3),
  }, {
    required_error: 'Weight is required',
    invalid_type_error: 'Weight must be an object',
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
    invalid_type_error: 'Base stats must be an object',
  }),

  moves: z
    .object({
      skill1: stringSchema('Skill 1', 3, 20),
      skill2: stringSchema('Skill 2', 3, 20),
    }, {
      required_error: 'Moves are required',
      invalid_type_error: 'Moves must be an object',
    }),

  image1: stringSchema('Image 1', 3, 200).url({
    message: 'Image 1 must be a valid URL',
  }),

  image2: stringSchema('Image 2', 3, 200).url({
    message: 'Image 2 must be a valid URL',
  }),
});

export const pokedexWithIDAndSchema = pokedexSchema.extend({
  _id: numberSchema('_id'),
});

export const partialPokedexSchema = pokedexSchema.partial();

type Pokedex = z.infer<typeof pokedexSchema>;
export type PokedexWithID = z.infer<typeof pokedexWithIDAndSchema>;

export default Pokedex;

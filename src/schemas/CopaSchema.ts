import { z } from 'zod';

const copaSchema = z.object({
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }),
  hostCountry: z.string({
    required_error: 'Host country is required',
    invalid_type_error: 'Host country must be a string',
  }).min(3, { message: 'Host country must be 3 or more characters long' }),
  champions: z.string({
    required_error: 'Champions is required',
    invalid_type_error: 'Champions must be a string',
  }).min(3, { message: 'Champions must be 3 or more characters long' }),
  runnerUp: z.string({
    required_error: 'Runner up is required',
    invalid_type_error: 'Runner up must be a string',
  }).min(3, { message: 'Runner up must be 3 or more characters long' }),
  editionGoals: z.number({
    required_error: 'Edition goals is required',
    invalid_type_error: 'Edition goals must be a number',
  }),
  editionStrikers: z.array(z.string({
    required_error: 'Edition strikers is required',
    invalid_type_error: 'Edition strikers must be an array',
  }).nonempty({ message: 'Edition strikers must be an array of strings' })),
  bestPlayer: z.string({
    required_error: 'Best player is required',
    invalid_type_error: 'Best player must be a string',
  }).min(3, { message: 'Best player must be 3 or more characters long' }),
  bestGoalkeeper: z.string({
    required_error: 'Best goalkeeper is required',
    invalid_type_error: 'Best goalkeeper must be a string',
  }).min(3, { message: 'Best goalkeeper must be 3 or more characters long' }),
  bestYoungPlayer: z.string({
    required_error: 'Best young player is required',
    invalid_type_error: 'Best young player must be a string',
  }).min(3, { message: 'Best young player must be 3 or more characters long' }),
});

type Copa = z.infer<typeof copaSchema>;

export default Copa;
export { copaSchema };

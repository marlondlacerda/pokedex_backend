import { z } from 'zod';

export const stringSchema = (type: string, min: number, max: number) => (
  z.string({
    required_error: `${type} is required`,
    invalid_type_error: `${type} must be a string`,
  }).min(min, {
    message: `${type} must have at least ${min} characters`,
  }).max(max, {
    message: `${type} must have at most ${max} characters`,
  }));

export const numberSchema = (type: string) => z.number({
  required_error: `${type} is required`,
  invalid_type_error: `${type} must be a number`,
});

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

export const skillSchema = (type:string) => z.object({
  name: stringSchema(`Name on ${type}`, 3, 30),
  type: stringSchema(`Type on ${type}`, 3, 30),
  category: stringSchema(`Category on ${type}`, 3, 30),
  pwr: numberSchema(`pwr on ${type}`),
  acc: numberSchema(`acc on ${type}`).min(0).max(100),
  pp: numberSchema(`pp on ${type}`),
}, {
  required_error: `${type} is required`,
  invalid_type_error: `${type} must be a object`,
});

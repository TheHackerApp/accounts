import { z } from 'zod';

export const schema = z
  .object({
    givenName: z.string().trim().min(1, 'Must be at least 1 character'),
    familyName: z.string().trim().min(1, 'Must be at least 1 character'),
  })
  .required();

export const defaults: z.infer<typeof schema> = {
  givenName: '',
  familyName: '',
};

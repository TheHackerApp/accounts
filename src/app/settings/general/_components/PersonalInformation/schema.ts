import { z } from 'zod';

export const schema = z
  .object({
    givenName: z.string().trim().min(1, 'Cannot be empty'),
    familyName: z.string().trim().min(1, 'Cannot be empty'),
    primaryEmail: z.string().trim().min(1, 'Cannot be empty').email('Invalid email address'),
  })
  .required();

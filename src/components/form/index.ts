'use client';

import type { FieldErrors } from 'react-hook-form';
import type { AnyZodObject, TypeOf, ZodError } from 'zod';

import type { UserError } from '@/graphql/types';

export type ActionState<TSchema extends AnyZodObject> =
  | ZodError<TypeOf<TSchema>>
  | FieldErrors<TypeOf<TSchema>>
  | UserError[]
  | undefined;
export type Action<TSchema extends AnyZodObject> = (
  previousState: ActionState<TSchema>,
  formData: FormData,
) => Promise<ActionState<TSchema>>;

export { SelectItem } from '@nextui-org/react';

export { useForm } from './hook';
export { default as SelectField } from './SelectField';
export { default as Submit } from './Submit';
export { default as TextField } from './TextField';

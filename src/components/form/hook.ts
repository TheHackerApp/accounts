import { set, useForm as useFormOriginal } from 'react-hook-form';
import type { DefaultValues, FieldError, FieldErrors, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodError } from 'zod';
import type { AnyZodObject, TypeOf } from 'zod';

import type { UserError } from '@/graphql/types';

import { fromZodError, resolver } from './resolver';

type Props<TSchema extends AnyZodObject> = Omit<
  UseFormProps<TypeOf<TSchema>>,
  'mode' | 'resolver' | 'criteriaMode' | 'defaultValues' | 'errors'
> & {
  schema: TSchema;
  defaults: DefaultValues<TypeOf<TSchema>>;
  errors?: ZodError<TypeOf<TSchema>> | FieldErrors<TypeOf<TSchema>> | UserError[];
};

export const useForm = <TSchema extends AnyZodObject>({
  schema,
  defaults,
  errors,
  ...props
}: Props<TSchema>): UseFormReturn<TypeOf<TSchema>> =>
  useFormOriginal<TypeOf<TSchema>>({
    mode: 'all',
    resolver: schema !== undefined ? resolver(schema) : undefined,
    criteriaMode: 'all',
    defaultValues: defaults,
    errors: transformErrors(errors),
    ...props,
  });

const transformErrors = <TSchema extends AnyZodObject>(
  errors?: ZodError<TypeOf<TSchema>> | FieldErrors<TypeOf<TSchema>> | UserError[],
): FieldErrors<TypeOf<TSchema>> | undefined => {
  if (errors === undefined) return undefined;
  else if (errors instanceof ZodError) return fromZodError(errors);
  // @ts-expect-error not totally sure why this is causing problems as it's signature is identical to fromZodError
  else if (Array.isArray(errors)) return fromUserErrors(errors);
  else return errors;
};

const fromUserErrors = <TSchema extends AnyZodObject>(userErrors: UserError[]): FieldErrors<TypeOf<TSchema>> => {
  const errors = {} as FieldErrors<TypeOf<TSchema>>;

  for (const { field, message } of userErrors) {
    const path = field.join('.');
    set(errors, path, { message, type: 'server', types: { server: message } } satisfies FieldError);
  }

  return errors;
};

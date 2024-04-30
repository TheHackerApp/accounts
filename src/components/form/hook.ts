import { useForm as useFormOriginal } from 'react-hook-form';
import type { DefaultValues, FieldErrors, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodError, z } from 'zod';

import { fromZodError, resolver } from './resolver';

type Props<TSchema extends z.AnyZodObject> = Omit<
  UseFormProps<z.infer<TSchema>>,
  'mode' | 'resolver' | 'criteriaMode' | 'defaultValues' | 'errors'
> & {
  schema: TSchema;
  defaults: DefaultValues<z.infer<TSchema>>;
  errors?: ZodError<z.infer<TSchema>> | FieldErrors<z.infer<TSchema>>;
};

export const useForm = <TSchema extends z.AnyZodObject>({
  schema,
  defaults,
  errors,
  ...props
}: Props<TSchema>): UseFormReturn<z.infer<TSchema>> =>
  useFormOriginal<z.infer<TSchema>>({
    mode: 'all',
    resolver: schema !== undefined ? resolver(schema) : undefined,
    criteriaMode: 'all',
    defaultValues: defaults,
    errors: transformErrors(errors),
    ...props,
  });

const transformErrors = <TSchema extends z.AnyZodObject>(
  errors?: ZodError<z.infer<TSchema>> | FieldErrors<z.infer<TSchema>>,
): FieldErrors<z.infer<TSchema>> | undefined => {
  if (errors === undefined) return undefined;
  else if (errors instanceof ZodError) return fromZodError(errors);
  else return errors;
};

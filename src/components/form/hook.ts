import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useFormOriginal } from 'react-hook-form';
import type { DefaultValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type Props<TSchema extends z.AnyZodObject> = Omit<UseFormProps<z.infer<TSchema>>, 'mode' | 'resolver'> & {
  schema: TSchema;
};

const getDefaultsForSchema = <TSchema extends z.AnyZodObject>(schema: TSchema): DefaultValues<z.infer<TSchema>> =>
  Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()];
      if (value instanceof z.ZodObject) return [key, getDefaultsForSchema(value)];
      return [key, undefined];
    }),
  ) as DefaultValues<z.infer<TSchema>>;

export const useForm = <TSchema extends z.AnyZodObject>({
  schema,
  defaultValues,
  ...props
}: Props<TSchema>): UseFormReturn<z.infer<TSchema>> =>
  useFormOriginal<z.infer<TSchema>>({
    mode: 'all',
    resolver: schema !== undefined ? zodResolver(schema) : undefined,
    defaultValues: defaultValues === undefined ? getDefaultsForSchema(schema) : defaultValues,
    ...props,
  });

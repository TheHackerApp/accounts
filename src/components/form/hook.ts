import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useFormOriginal } from 'react-hook-form';
import type { DefaultValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type Props<TSchema extends z.AnyZodObject> = Omit<
  UseFormProps<z.infer<TSchema>>,
  'mode' | 'resolver' | 'defaultValues'
> & {
  schema: TSchema;
  defaults: DefaultValues<z.infer<TSchema>>;
};

export const useForm = <TSchema extends z.AnyZodObject>({
  schema,
  defaults,
  ...props
}: Props<TSchema>): UseFormReturn<z.infer<TSchema>> =>
  useFormOriginal<z.infer<TSchema>>({
    mode: 'all',
    resolver: schema !== undefined ? zodResolver(schema) : undefined,
    defaultValues: defaults,
    ...props,
  });

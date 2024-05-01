'use client';

import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import type { TypeOf, ZodError } from 'zod';

import { Submit, TextField, useForm } from '@/components/form';
import { completeRegistration } from '@/lib/oauth';

import { defaults, schema } from './schema';

type ActionState = ZodError<TypeOf<typeof schema>> | undefined;
const action = async (_previous: ActionState, formData: FormData): Promise<ActionState> => {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) return result.error;

  const { redirectUri } = await completeRegistration(result.data);
  redirect(redirectUri);
};

const Form = (): ReactNode => {
  const [errors, formAction] = useFormState(action, undefined);
  const { control } = useForm({ schema, defaults, errors });

  return (
    <form className="space-y-6" action={formAction}>
      <TextField control={control} name="givenName" label="Given Name" />
      <TextField control={control} name="familyName" label="Family Name" />
      <Submit control={control} label="Save" color="primary" fullWidth />
    </form>
  );
};

export default Form;

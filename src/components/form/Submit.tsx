import { Button } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { useFormState } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = Omit<ButtonProps, 'isLoading' | 'type' | 'form'> & {
  control: Control<TFieldValues>;
  label?: string;
};

const Submit = <TFieldValues extends FieldValues = FieldValues>({
  control,
  label = 'Submit',
  isDisabled,
  ...rest
}: Props<TFieldValues>): ReactNode => {
  const { isValid } = useFormState({ control });
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isDisabled={!isValid || isDisabled} isLoading={pending} {...rest}>
      {label}
    </Button>
  );
};

export default Submit;

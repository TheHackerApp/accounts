import type { InputProps } from '@nextui-org/input';
import { Input } from '@nextui-org/react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { useController } from 'react-hook-form';
import type { Control, ControllerRenderProps, FieldPathByValue, FieldValues } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>> = Omit<
  InputProps,
  keyof ControllerRenderProps | 'value' | 'onValueChange' | 'isRequired' | 'form'
> & {
  control: Control<TFieldValues>;
  name: TPath;
};

const TextField = <TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>>({
  control,
  name,
  required,
  ...rest
}: Props<TFieldValues, TPath>): ReactNode => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController<TFieldValues, TPath>({ name, control, rules: { required } });
  const { pending } = useFormStatus();

  return (
    <Input
      type="text"
      {...rest}
      isDisabled={pending}
      isRequired={required}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...field}
    />
  );
};

export default TextField;

import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Control, ControllerRenderProps, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

type Props<TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>> = Omit<
  SelectProps<Option | string>,
  keyof ControllerRenderProps | 'value' | 'onSelectionChange' | 'isRequired' | 'form' | 'children' | 'items'
> & {
  control: Control<TFieldValues>;
  name: TPath;
  options: Iterable<Option | string>;
};

const SelectField = <TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>>({
  name,
  control,
  required,
  options: optionsIter,
  isDisabled,
  ...rest
}: Props<TFieldValues, TPath>): ReactNode => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });
  const { pending } = useFormStatus();

  const options = Array.from(optionsIter);

  return (
    <Select
      {...rest}
      isDisabled={pending || isDisabled}
      isRequired={required}
      isInvalid={invalid}
      errorMessage={error?.message}
      selectedKeys={[field.value]}
      {...field}
    >
      {options.map((option) =>
        typeof option === 'string' ? (
          <SelectItem key={option}>{option}</SelectItem>
        ) : (
          <SelectItem key={option.value}>{option.label}</SelectItem>
        ),
      )}
    </Select>
  );
};

export default SelectField;

import { Link } from '@nextui-org/react';
import { ReactNode, Suspense } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { SelectField } from '@/components/form';

import { useIdentitiesSuspenseQuery } from './Identities.graphql';

interface Props<TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>> {
  control: Control<TFieldValues>;
  name: TPath;
}

const PrimaryEmailSelect = <TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, string>>({
  control,
  name,
}: Props<TFieldValues, TPath>): ReactNode => {
  const { field } = useController({ name, control });

  const fallback = (
    <SelectField
      control={control}
      name={name}
      options={[field.value]}
      isLoading
      isDisabled
      label="Primary email address"
      description={<FieldDescription />}
    />
  );

  return (
    <Suspense fallback={fallback}>
      <PrimaryEmailSelectWithIdentities control={control} name={name} />
    </Suspense>
  );
};

const PrimaryEmailSelectWithIdentities = <
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, string>,
>({
  control,
  name,
}: Props<TFieldValues, TPath>): ReactNode => {
  const { data } = useIdentitiesSuspenseQuery();
  const identities = new Set(data.me.identities.map((identity) => identity.email));

  return (
    <SelectField
      control={control}
      name={name}
      options={identities}
      label="Primary email address"
      description={<FieldDescription />}
    />
  );
};

const FieldDescription = (): ReactNode => (
  <>
    We&apos;ll send any account and event notifications to this address. You can manage your emails on the{' '}
    <Link href="/settings/authentication" className="text-tiny">
      Sign-in methods
    </Link>{' '}
    page.
  </>
);

export default PrimaryEmailSelect;

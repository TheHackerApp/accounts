import { ReactNode } from 'react';

import Form from './_components/Form';

export const metadata = {
  title: 'Sign up - The Hacker App',
};

export default function CompleteProfile(): ReactNode {
  return (
    <>
      <h1 className="pb-4 text-left text-3xl font-semibold">What should we call you?</h1>
      <Form />
    </>
  );
}

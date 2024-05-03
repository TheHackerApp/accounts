import Events from './_components/Events';
import Heading from './_components/Heading';
import ListSection from './_components/ListSection';

export const metadata = {
  title: 'The Hacker App',
};

export default function Home() {
  return (
    <>
      <Heading />
      <div className="pl-2.5 space-y-4">
        <ListSection title="Your Events">
          <Events />
        </ListSection>
      </div>
    </>
  );
}

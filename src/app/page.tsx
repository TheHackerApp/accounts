import Image from 'next/image';

interface CardProps {
  title: string;
  content: string;
  href: string;
}

function Card({ title, content, href }: CardProps) {
  return (
    <a
      href={href}
      className="group py-4 px-5 transition-[background,_border] duration-200 rounded-xl hover:bg-[rgba(180,185,188,0.1)] hover:border-[rgba(131,134,135,0.15)]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="font-semibold mb-3">
        {title} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
      </h2>
      <p className="m-0 opacity-60 max-w-[30ch] leading-6 text-balance">{content}</p>
    </a>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-screen">
      <div className="flex justify-between items-center w-full max-w-full">
        <p className="relative m-0 p-4 rounded-xl bg-[rgba(238,240,241,0.5)] border-[rgba(172,175,176, 0.3)]">
          Get started by editing&nbsp;
          <code className="font-bold font-mono">src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center relative py-16">
        <Image className="relative" src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
      </div>

      <div className="grid grid-cols-4 max-w-full">
        <Card
          title="Docs"
          content="Find in-depth information about Next.js features and API."
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        />

        <Card
          title="Learn"
          content="Learn about Next.js in an interactive course with quizzes!"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        />
        <Card
          title="Templates"
          content="Explore starter templates for Next.js."
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        />
        <Card
          title="Deploy"
          content="Instantly deploy your Next.js site to a shareable URL with Vercel."
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        />
      </div>
    </main>
  );
}

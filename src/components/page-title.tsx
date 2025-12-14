interface PageTitleProps {
  title: string;
  subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <header className="mb-16 text-center">
      <h1 className="mb-4 text-4xl font-semibold md:text-5xl">{title}</h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-300">{subtitle}</p>
    </header>
  );
}

interface SectionTitleProps {
  title: string;
  description: string;
}

export default function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h2 className="mx-auto mt-4 max-w-lg text-3xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-center text-sm/7 text-gray-100">{description}</p>
    </div>
  );
}

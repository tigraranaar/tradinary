import SectionTitle from "./section-title";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Select Trading Pair",
    description:
      "Choose the cryptocurrency or stock pair you want to analyze. Our AI supports major trading pairs across different markets.",
    image: "/assets/workflow1.webp",
  },
  {
    id: 2,
    title: "Get Signal & Make Decision",
    description:
      "Receive instant buy, sell, or hold signals powered by technical analysis and machine learning models. Use AI-powered insights to make informed trading decisions.",
    image: "/assets/workflow2.webp",
  },
  {
    id: 3,
    title: "Get Profit",
    description:
      "Execute your trades based on AI signals and track your performance. Watch your profits grow as you follow data-driven trading recommendations.",
    image: "/assets/workflow3.webp",
  },
];

export default function WorkflowSteps() {
  return (
    <section className="relative mt-32">
      <SectionTitle
        title="How Tradinary Works"
        description="Get AI-powered trading signals in three simple steps. From selecting a pair to executing trades and maximizing your profits."
      />

      <div className="relative mt-20 space-y-20 md:space-y-30">
        <div className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex">
          <div className="my-10 flex aspect-square items-center justify-center rounded-full bg-black/15 p-2 font-medium">
            01
          </div>
          <div className="h-72 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="my-10 flex aspect-square items-center justify-center rounded-full bg-black/15 p-2 font-medium">
            02
          </div>
          <div className="h-72 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="my-10 flex aspect-square items-center justify-center rounded-full bg-black/15 p-2 font-medium">
            03
          </div>
        </div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-center gap-6 md:gap-20 ${index % 2 !== 0 ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"}`}
          >
            <Image
              src={step.image}
              alt="step"
              className="h-auto w-full max-w-sm flex-1 rounded-2xl"
              width={400}
              height={300}
              style={{ height: "auto" }}
            />
            <div key={index} className="flex max-w-md flex-1 flex-col gap-6 md:px-6">
              <h3 className="text-2xl font-medium text-white">{step.title}</h3>
              <p className="line-clamp-3 pb-2 text-sm/6 text-gray-100">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

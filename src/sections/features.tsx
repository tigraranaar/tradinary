import SectionTitle from "@/components/section-title";
import { FaChartLine, FaBrain, FaRobot, FaBolt } from "react-icons/fa6";

export default function Features() {
  const featuresData = [
    {
      icon: FaChartLine,
      title: "Technical Analysis",
      description:
        "Comprehensive technical analysis to generate accurate buy, sell, and hold signals.",
    },
    {
      icon: FaBrain,
      title: "ML-Powered Signals",
      description:
        "Advanced machine learning model enhances signal accuracy with predictive insights.",
    },
    {
      icon: FaRobot,
      title: "Multi-AI Analysis",
      description: "Multiple AI models work together to provide comprehensive market intelligence.",
    },
    {
      icon: FaBolt,
      title: "Real-time Signals",
      description: "Get instant buy/sell/hold recommendations based on live market data analysis.",
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Trading Features"
        description="Advanced AI-powered trading signals to help you make informed decisions and optimize your trading strategy."
      />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 px-6">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="glass w-full max-w-80 space-y-4 rounded-xl p-6 transition duration-300 hover:-translate-y-0.5"
          >
            <feature.icon className="size-8.5" />
            <h3 className="text-base font-medium text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-gray-100">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import SectionTitle from "./section-title";
import { FaCheck, FaCrown, FaGift, FaBolt } from "react-icons/fa6";
import Link from "next/link";

export default function PricingPlans() {
  const data = [
    {
      icon: FaGift,
      title: "Free",
      description: "Perfect for getting started",
      price: "$0",
      buttonText: "Get Started",
      features: [
        "Full technical analysis",
        "Buy/Sell/Hold signals",
        "Basic market insights",
        "Limited signals per day",
        "Community support",
        "Email notifications",
      ],
    },
    // {
    //   icon: FaBolt,
    //   title: "Pro",
    //   description: "For serious traders",
    //   price: "$29",
    //   mostPopular: true,
    //   buttonText: "Upgrade Now",
    //   features: [
    //     "Everything in Free",
    //     "ML-powered signals",
    //     "Enhanced accuracy",
    //     "Unlimited signals",
    //     "Advanced analytics",
    //     "Priority support",
    //   ],
    // },
    {
      icon: FaBolt,
      title: "Pro",
      description: "For serious traders",
      price: null,
      mostPopular: false,
      buttonText: "Contact Sales",
      features: [
        "Everything in Free",
        "ML-powered signals",
        "Enhanced accuracy",
        "Unlimited signals",
        "Advanced analytics",
        "Priority support",
      ],
    },
    {
      icon: FaCrown,
      title: "Premium",
      description: "Maximum AI power",
      price: null,
      buttonText: "Contact Sales",
      features: [
        "Everything in Pro",
        "Multiple AI models",
        "Highest accuracy signals",
        "Real-time alerts",
        "Custom strategies",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Choose Your Plan"
        description="Start with our free plan and upgrade as you grow. All plans include AI-powered trading signals to help you make better decisions."
      />

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="group glass w-full max-w-80 rounded-xl p-6 transition duration-300 hover:-translate-y-0.5"
          >
            <div className="glass ml-auto flex w-max items-center gap-2 rounded-full px-3 py-1 text-xs">
              <item.icon className="size-3.5" />
              <span>{item.title}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">
              {item.price ? (
                <>
                  {item.price} <span className="text-sm font-normal">/month</span>
                </>
              ) : (
                <span className="text-lg">Contact for pricing</span>
              )}
            </h3>
            <p className="mt-3 text-gray-200">{item.description}</p>
            {item.buttonText === "Contact Sales" ? (
              <Link
                href="/contact"
                className={`btn mt-7 w-full rounded-md ${item.mostPopular ? "bg-white text-gray-800" : "glass"} block text-center`}
              >
                {item.buttonText}
              </Link>
            ) : (
              <Link
                href={"/auth/login"}
                className={`btn mt-7 w-full rounded-md ${item.mostPopular ? "bg-white text-gray-800" : "glass"} block text-center`}
              >
                {item.buttonText}
              </Link>
            )}
            <div className="mt-6 flex flex-col">
              {item.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 py-2">
                  <div className="glass rounded-full border-0 p-1">
                    <FaCheck className="size-3 text-white" />
                  </div>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

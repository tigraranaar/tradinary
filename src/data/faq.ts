export interface FAQItem {
  question: string;
  answer: string;
  slug: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How does the free version work?",
    answer:
      "The free version provides comprehensive technical analysis to generate buy, sell, and hold trading signals. You get access to full technical indicators and market analysis tools. Our free plan is perfect for getting started with AI-powered trading insights without any commitment.",
    slug: "how-does-free-version-work",
  },
  {
    question: "What is included in the Pro version?",
    answer:
      "Pro version includes everything from the free plan plus our advanced machine learning model that enhances signal accuracy with predictive insights and improved trading recommendations. With Pro, you'll get access to more sophisticated analysis tools and priority support to help you make better trading decisions.",
    slug: "what-is-included-in-pro-version",
  },
  {
    question: "What makes Premium different from Pro?",
    answer:
      "Premium includes technical analysis, ML-powered signals, plus multiple AI models working together to provide comprehensive market intelligence and the most accurate trading signals. Premium subscribers also receive exclusive features, advanced analytics, and dedicated customer support for the ultimate trading experience.",
    slug: "what-makes-premium-different-from-pro",
  },
  {
    question: "How accurate are the trading signals?",
    answer:
      "Signal accuracy improves with each tier. Free version uses technical analysis, Pro adds ML model predictions, and Premium combines multiple AI models for the highest accuracy. Our models are continuously trained on market data to improve performance, and we provide transparency on signal accuracy metrics for each plan.",
    slug: "how-accurate-are-trading-signals",
  },
  {
    question: "Do I need trading experience to use Tradinary?",
    answer:
      "No prior trading experience is required. Our AI assistant provides clear buy/sell/hold signals that are easy to understand, making it suitable for both beginners and experienced traders. We also offer educational resources and guides to help you get started, regardless of your experience level.",
    slug: "do-i-need-trading-experience",
  },
  {
    question: "Can I try Tradinary before subscribing?",
    answer:
      "Yes, you can start with our free version that includes full technical analysis and trading signals. Upgrade to Pro or Premium anytime to unlock advanced features. There's no credit card required for the free plan, so you can explore all the basic features risk-free.",
    slug: "can-i-try-tradinary-before-subscribing",
  },
];

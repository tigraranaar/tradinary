import { PolicyData } from "@/types/policy";

export const cookiesData: PolicyData = {
  title: "Cookie Policy — Tradinary",
  subtitle: "Last updated: December 10, 2025",
  introduction:
    "This Cookie Policy explains how Tradinary uses cookies and similar technologies when you visit tradinary.ai or use our SaaS platform. By using our Service, you agree to our use of cookies as described in this policy.",
  sections: [
    {
      title: "What Are Cookies",
      number: 1,
      content: [
        {
          type: "paragraph",
          text: "Cookies are small text files stored on your device that help websites remember information about your visit. Cookies can improve your experience by:",
        },
        {
          type: "list",
          items: [
            "Remembering your login and preferences",
            "Analyzing how you use the Service",
            "Helping us deliver targeted content and improve the platform",
          ],
        },
      ],
    },
    {
      title: "Types of Cookies We Use",
      number: 2,
      subsections: [
        {
          title: "2.1 Essential Cookies",
          content: [
            {
              type: "paragraph",
              text: "These cookies are necessary for the Service to function properly. They help:",
            },
            {
              type: "list",
              items: ["Maintain user sessions", "Enable basic features like login"],
            },
          ],
        },
        {
          title: "2.2 Analytics Cookies",
          content: [
            {
              type: "paragraph",
              text: "We use Google Analytics to understand user behavior and improve the Service. Analytics cookies collect information about:",
            },
            {
              type: "list",
              items: ["Pages visited", "Time spent on pages", "Device type and browser"],
            },
            {
              type: "paragraph",
              text: "These cookies do not personally identify you.",
            },
          ],
        },
        {
          title: "2.3 Third-Party Cookies",
          content: [
            {
              type: "paragraph",
              text: "We may use cookies from third-party services such as:",
            },
            {
              type: "list",
              items: [
                "Google Analytics",
                "Stripe (for payment processing)",
                "Google Authentication",
              ],
            },
            {
              type: "paragraph",
              text: "These third parties may collect and use data according to their own privacy policies.",
            },
          ],
        },
      ],
    },
    {
      title: "How to Manage Cookies",
      number: 3,
      content: [
        {
          type: "paragraph",
          text: "You can control cookies through your browser settings. You can:",
        },
        {
          type: "list",
          items: [
            "Block or delete cookies",
            "Clear browsing history",
            "Set preferences for specific websites",
          ],
        },
        {
          type: "paragraph",
          text: "Please note that disabling some cookies may affect the functionality of Tradinary.",
        },
      ],
    },
    {
      title: "Changes to This Cookie Policy",
      number: 4,
      content: [
        {
          type: "paragraph",
          text: "We may update this Cookie Policy from time to time. Any changes will be posted on this page.",
        },
      ],
    },
    {
      title: "Contact",
      number: 5,
      content: [
        {
          type: "paragraph-with-link",
          text: "If you have questions about our use of cookies, contact us at",
          linkText: "tradinary.ai/contact",
          linkHref: "/contact",
        },
      ],
    },
  ],
};

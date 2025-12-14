import { PolicyData } from "@/types/policy";

export const privacyData: PolicyData = {
  title: "Privacy Policy — Tradinary",
  subtitle: "Last updated: December 10, 2025",
  introduction:
    "This Privacy Policy explains how Tradinary collects, uses, and protects your personal information when you use our website tradinary.ai and our SaaS platform. By using our Service, you agree to the practices described in this Privacy Policy.",
  sections: [
    {
      title: "Information We Collect",
      number: 1,
      subsections: [
        {
          title: "1.1 Personal Information",
          content: [
            {
              type: "paragraph",
              text: "When you use Tradinary, we may collect:",
            },
            {
              type: "list",
              items: ["Your email address", "Account information provided during sign-up"],
            },
          ],
        },
        {
          title: "1.2 Cookies and Tracking",
          content: [
            {
              type: "paragraph",
              text: "We use cookies and similar technologies to:",
            },
            {
              type: "list",
              items: [
                "Maintain user sessions",
                "Improve platform performance",
                "Remember user preferences",
              ],
            },
          ],
        },
        {
          title: "1.3 Google Analytics",
          content: [
            {
              type: "paragraph",
              text: "We use Google Analytics to understand how users interact with Tradinary. Google Analytics may collect:",
            },
            {
              type: "list",
              items: ["Device information", "Browsing actions and interactions"],
            },
          ],
        },
        {
          title: "1.4 Third-Party Services",
          content: [
            {
              type: "paragraph",
              text: "We integrate with third-party services including:",
            },
            {
              type: "list",
              items: ["Stripe (for payments)", "Google Authentication (for login)"],
            },
            {
              type: "paragraph",
              text: "These services may collect and process data according to their own privacy policies.",
            },
          ],
        },
      ],
    },
    {
      title: "How We Use Your Information",
      number: 2,
      content: [
        {
          type: "paragraph",
          text: "We use your data to:",
        },
        {
          type: "list",
          items: [
            "Provide and operate the Service",
            "Manage user accounts and subscriptions",
            "Improve platform features and user experience",
            "Communicate with users",
            "Ensure security and prevent abuse",
          ],
        },
      ],
    },
    {
      title: "Sharing and Disclosure",
      number: 3,
      content: [
        {
          type: "paragraph",
          text: "We do not sell personal information. We may share data with:",
        },
        {
          type: "list",
          items: [
            "Service providers like Stripe or Google for operation purposes",
            "Legal authorities if required by law",
          ],
        },
      ],
    },
    {
      title: "Data Retention",
      number: 4,
      content: [
        {
          type: "paragraph",
          text: "We keep personal data only as long as necessary to provide the Service, comply with legal obligations, and resolve disputes.",
        },
      ],
    },
    {
      title: "User Rights",
      number: 5,
      content: [
        {
          type: "paragraph-with-link",
          text: "You can contact us through",
          linkText: "tradinary.ai/contact",
          linkHref: "/contact",
          textAfter: "to:",
        },
        {
          type: "list",
          items: [
            "Access your data",
            "Correct or update your information",
            "Delete your account and personal data",
          ],
        },
      ],
    },
    {
      title: "Security",
      number: 6,
      content: [
        {
          type: "paragraph",
          text: "We use reasonable measures to protect your data from unauthorized access, alteration, disclosure, or destruction.",
        },
      ],
    },
    {
      title: "Changes to This Policy",
      number: 7,
      content: [
        {
          type: "paragraph",
          text: "We may update this Privacy Policy occasionally. Changes will be posted on this page.",
        },
      ],
    },
    {
      title: "Contact",
      number: 8,
      content: [
        {
          type: "paragraph-with-link",
          text: "If you have questions about your data, reach us at",
          linkText: "tradinary.ai/contact",
          linkHref: "/contact",
        },
      ],
    },
  ],
};

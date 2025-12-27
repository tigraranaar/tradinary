import { PolicyData } from "@/types/policy";

export const termsData: PolicyData = {
  title: "Terms of Use — Tradinary",
  subtitle: "Last updated: December 10, 2025",
  introduction:
    "These Terms of Use govern your access to and use of Tradinary and its website tradinary.ai. By using Tradinary, you agree to these Terms.",
  sections: [
    {
      title: "Acceptance of Terms",
      number: 1,
      content: [
        {
          type: "paragraph",
          text: "By using Tradinary, you confirm you agree to these Terms. There are no age restrictions for our Service.",
        },
      ],
    },
    {
      title: "Service Description",
      number: 2,
      content: [
        {
          type: "paragraph",
          text: "Tradinary is a software-as-a-service platform offering free and paid subscription plans: Free, Pro, and Enterprise. The Service may be updated or modified at any time.",
        },
      ],
    },
    {
      title: "User Accounts",
      number: 3,
      content: [
        {
          type: "paragraph",
          text: "You are responsible for:",
        },
        {
          type: "list",
          items: [
            "Providing accurate information",
            "Maintaining the security of your login credentials",
            "All actions taken under your account",
          ],
        },
        {
          type: "paragraph",
          text: "Accounts may be suspended for suspicious or abusive behavior.",
        },
      ],
    },
    {
      title: "Subscription and Payments",
      number: 4,
      content: [
        {
          type: "list",
          items: [
            "Paid plans are processed through Stripe.",
            "Subscriptions renew automatically unless canceled.",
            "You can cancel or request account deletion through our support.",
          ],
        },
      ],
    },
    {
      title: "Acceptable Use",
      number: 5,
      content: [
        {
          type: "paragraph",
          text: "You agree not to:",
        },
        {
          type: "list",
          items: [
            "Use the Service for illegal activities",
            "Interfere with the Service's operation",
            "Attempt unauthorized access to systems",
            "Upload harmful or malicious content",
          ],
        },
      ],
    },
    {
      title: "Intellectual Property",
      number: 6,
      content: [
        {
          type: "paragraph",
          text: "All content, software, and materials are property of Tradinary or its licensors. You may not copy, modify, or distribute them without permission.",
        },
      ],
    },
    {
      title: "Termination",
      number: 7,
      content: [
        {
          type: "paragraph",
          text: "We may suspend or terminate your account if you violate these Terms. You may stop using the Service at any time.",
        },
      ],
    },
    {
      title: "Disclaimer of Warranties",
      number: 8,
      content: [
        {
          type: "paragraph",
          text: 'Tradinary is provided "as is" without warranties. We do not guarantee uninterrupted or error-free service.',
        },
      ],
    },
    {
      title: "Limitation of Liability",
      number: 9,
      content: [
        {
          type: "paragraph",
          text: "Tradinary is not liable for indirect damages, data loss, or service interruptions. Your sole remedy is to stop using the Service.",
        },
      ],
    },
    {
      title: "Governing Law",
      number: 10,
      content: [
        {
          type: "paragraph",
          text: "These Terms are governed by the laws of the Republic of Armenia.",
        },
      ],
    },
    {
      title: "Changes to Terms",
      number: 11,
      content: [
        {
          type: "paragraph",
          text: "We may update these Terms. Continued use of Tradinary after updates means you accept the revised Terms.",
        },
      ],
    },
    {
      title: "Contact",
      number: 12,
      content: [
        {
          type: "paragraph-with-link",
          text: "For questions about these Terms, reach us at",
          linkText: "tradinary.ai/contact",
          linkHref: "/contact",
        },
      ],
    },
  ],
};

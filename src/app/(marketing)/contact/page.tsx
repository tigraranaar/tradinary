"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import PageTitle from "../components/page-title";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { Input } from "@/components/ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn glass w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContactForm,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success and show toasts
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      formRef.current?.reset();
      if (state.message) {
        toast.success(state.message);
      }
    } else {
      // Show error toasts (prioritize _form errors, then general message)
      if (state.errors?._form) {
        toast.error(state.errors._form[0]);
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <main className="min-h-screen px-4 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl py-20">
        <div>
          <PageTitle
            title="Get in Touch"
            subtitle="Have a question or want to work together? We'd love to hear from you."
          />
        </div>

        <div className="flex justify-center">
          {/* Contact Form */}
          <div className="w-full max-w-2xl">
            <form ref={formRef} action={formAction} className="glass space-y-6 rounded-lg p-8">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  aria-invalid={state?.errors?.name ? "true" : "false"}
                  aria-describedby={state?.errors?.name ? "name-error" : undefined}
                />
                {state?.errors?.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  aria-invalid={state?.errors?.email ? "true" : "false"}
                  aria-describedby={state?.errors?.email ? "email-error" : undefined}
                />
                {state?.errors?.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  aria-invalid={state?.errors?.subject ? "true" : "false"}
                  aria-describedby={state?.errors?.subject ? "subject-error" : undefined}
                />
                {state?.errors?.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-400">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 transition focus:ring-2 focus:ring-white/30 focus:outline-none"
                  placeholder="Your message..."
                  aria-invalid={state?.errors?.message ? "true" : "false"}
                  aria-describedby={state?.errors?.message ? "message-error" : undefined}
                />
                {state?.errors?.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

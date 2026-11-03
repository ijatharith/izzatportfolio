/** Contact form rules, shared by the client (instant feedback) and server (authority). */

export const contactLimits = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 4000 },
  email: { max: 254 },
} as const;

export type ContactField = "name" | "email" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Enter your name.";
      if (value.length < contactLimits.name.min) return "Name needs at least 2 characters.";
      if (value.length > contactLimits.name.max) return `Keep your name under ${contactLimits.name.max} characters.`;
      return;
    case "email":
      if (!value) return "Enter your email so I can reply.";
      if (value.length > contactLimits.email.max || !EMAIL_RE.test(value))
        return "Enter a valid email address, like name@example.com.";
      return;
    case "subject":
      if (!value) return "Add a subject.";
      if (value.length < contactLimits.subject.min) return "Subject needs at least 3 characters.";
      if (value.length > contactLimits.subject.max) return `Keep the subject under ${contactLimits.subject.max} characters.`;
      return;
    case "message":
      if (!value) return "Write a message.";
      if (value.length < contactLimits.message.min)
        return `Add a little more detail — at least ${contactLimits.message.min} characters.`;
      if (value.length > contactLimits.message.max)
        return `Keep the message under ${contactLimits.message.max} characters.`;
      return;
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as ContactField[]).forEach((f) => {
    const e = validateField(f, values[f]);
    if (e) errors[f] = e;
  });
  return errors;
}

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
  values?: Partial<ContactValues>;
}

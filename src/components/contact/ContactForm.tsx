"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Info } from "lucide-react";
import { sendContactMessage } from "@/app/contact/actions";
import {
  contactLimits,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const fields: {
  name: ContactField;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  max: number;
}[] = [
  { name: "name", label: "Name", autoComplete: "name", max: contactLimits.name.max },
  { name: "email", label: "Email", type: "email", autoComplete: "email", max: contactLimits.email.max },
  { name: "subject", label: "Subject", max: contactLimits.subject.max },
  { name: "message", label: "Message", multiline: true, max: contactLimits.message.max },
];

export function ContactForm({ enabled, email }: { enabled: boolean; email: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Server errors show after a submission; live client checks replace them
  // as soon as the person edits that field.
  const errors: ContactErrors = { ...(state.status === "error" ? state.errors : {}), ...clientErrors };

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      startedAt.current = Date.now();
    }
    if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  const onBlur = (field: ContactField, value: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setClientErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  };

  const onChange = (field: ContactField, value: string) => {
    if (touched[field]) setClientErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const values = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validateContact(values);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setClientErrors(found);
      setTouched({ name: true, email: true, subject: true, message: true });
      const first = (Object.keys(found) as ContactField[])[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
      aria-describedby={!enabled ? "form-unavailable" : undefined}
    >
      {!enabled && (
        <div id="form-unavailable" className="flex gap-3 rounded-[var(--radius-card)] bg-wash p-4 text-[0.9375rem]">
          <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <p>
            <strong className="font-semibold">The form isn&apos;t connected yet.</strong> Messages
            can&apos;t be delivered from here for now — email me at{" "}
            <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-accent">
              {email}
            </a>{" "}
            instead.
          </p>
        </div>
      )}

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none empty:hidden">
        {state.status === "success" && (
          <p className="flex items-start gap-3 rounded-[var(--radius-card)] border border-success/30 bg-white p-4 text-[0.9375rem]">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="flex items-start gap-3 rounded-[var(--radius-card)] border border-ink/20 bg-white p-4 text-[0.9375rem]">
            <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <StartedAt startedAt={startedAt} />

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((f) => {
          const error = errors[f.name];
          const errorId = `${f.name}-error`;
          const fieldClass = cn(
            "w-full rounded-xl border bg-white px-4 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-ink" : "border-line focus:border-accent",
          );
          return (
            <div key={f.name} className={f.multiline || f.name === "subject" ? "sm:col-span-2" : undefined}>
              <label htmlFor={f.name} className="mb-2 flex items-baseline justify-between text-[0.9375rem] font-medium">
                <span>
                  {f.label} <span aria-hidden="true" className="text-accent">*</span>
                </span>
                <span className="meta font-normal">Required</span>
              </label>
              {f.multiline ? (
                <textarea
                  id={f.name}
                  name={f.name}
                  rows={6}
                  required
                  maxLength={f.max}
                  disabled={!enabled}
                  defaultValue={state.values?.[f.name]}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  onBlur={(e) => onBlur(f.name, e.target.value)}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  className={cn(fieldClass, "min-h-40 resize-y py-3 leading-relaxed")}
                />
              ) : (
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type ?? "text"}
                  required
                  maxLength={f.max}
                  autoComplete={f.autoComplete}
                  disabled={!enabled}
                  defaultValue={state.values?.[f.name]}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  onBlur={(e) => onBlur(f.name, e.target.value)}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  className={cn(fieldClass, "h-12")}
                />
              )}
              {error && (
                <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-ink">
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">Your email is only used to reply.</p>
        <button
          type="submit"
          disabled={!enabled || pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-[0.9375rem] font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-45"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

/** Records when the form was opened, for the server's minimum-time check. */
function StartedAt({ startedAt }: { startedAt: React.RefObject<number> }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(startedAt.current || Date.now());
  });
  return <input ref={ref} type="hidden" name="startedAt" defaultValue="" />;
}

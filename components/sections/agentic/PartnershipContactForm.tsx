"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { lab } from "@/data/lab";
import { getLocalizedPath, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export type ContactFormCopy = {
  title: string;
  supporting: string;
  responseTime: string;
  include: string;
  privacyNote: string;
  privacyLink: string;
  name: string;
  org: string;
  email: string;
  message: string;
  enquiryType: string;
  enquiryOptions: { value: string; label: string }[];
  submit: string;
  submitting: string;
  copyEmail: string;
  fieldRequired: string;
  emailInvalid: string;
  success: string;
  networkError: string;
  deliveryUnavailable: string;
  copied: string;
  copyFailed: string;
  mailSubject: string;
};

type FieldKey = "name" | "org" | "email" | "message" | "enquiryType";
type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Partnership enquiry form.
 * Submits via POST /api/contact — never via GET — so PII cannot leak into URLs.
 */
export function PartnershipContactForm({
  copy,
  locale,
  source = "website",
  compact = false,
}: {
  copy: ContactFormCopy;
  locale: Locale;
  source?: string;
  compact?: boolean;
}) {
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const enquiryRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [enquiryType, setEnquiryType] = useState(
    copy.enquiryOptions[0]?.value ?? "",
  );
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {},
  );
  const [state, setState] = useState<FormState>("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (state === "success") successRef.current?.focus();
  }, [state]);

  const clearFieldError = (key: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!name.trim()) next.name = copy.fieldRequired;
    if (!org.trim()) next.org = copy.fieldRequired;
    if (!email.trim()) next.email = copy.fieldRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = copy.emailInvalid;
    }
    if (!message.trim()) next.message = copy.fieldRequired;
    if (!enquiryType.trim()) next.enquiryType = copy.fieldRequired;
    return next;
  };

  const focusFirstInvalid = (errors: Partial<Record<FieldKey, string>>) => {
    const order: FieldKey[] = [
      "enquiryType",
      "name",
      "org",
      "email",
      "message",
    ];
    for (const key of order) {
      if (!errors[key]) continue;
      const map = {
        enquiryType: enquiryRef,
        name: nameRef,
        org: orgRef,
        email: emailRef,
        message: messageRef,
      } as const;
      map[key].current?.focus();
      return;
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    setFormError("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      focusFirstInvalid(errors);
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          org: org.trim(),
          email: email.trim(),
          message: message.trim(),
          enquiryType,
          source,
          locale,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fallbackEmail?: string;
      };

      if (!res.ok || !data.ok) {
        setState("error");
        if (data.error === "delivery_unavailable") {
          setFormError(copy.deliveryUnavailable);
        } else {
          setFormError(copy.networkError);
        }
        return;
      }

      setState("success");
      setName("");
      setOrg("");
      setEmail("");
      setMessage("");
      setEnquiryType(copy.enquiryOptions[0]?.value ?? "");
      setFieldErrors({});
    } catch {
      setState("error");
      setFormError(copy.networkError);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(lab.contactEmail);
      setFormError("");
      setState((prev) => (prev === "success" ? prev : "idle"));
      // Reuse formError slot briefly via a dedicated success path for copy
      setFormError(copy.copied);
    } catch {
      setFormError(copy.copyFailed);
    }
  };

  const fieldClass =
    "mt-2 w-full border border-white/20 bg-[#0a0a0a] px-3 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const errorClass = "mt-1.5 text-sm text-accent";
  const privacyHref = getLocalizedPath(locale, "privacy");

  const describedBy = (key: FieldKey, errorId: string) =>
    fieldErrors[key] ? errorId : undefined;

  return (
    <div
      className={cx(
        "border border-white/15 bg-[#080808]",
        compact ? "p-4 md:p-5" : "p-5 md:p-7",
      )}
    >
      <p className="text-base font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">
        {copy.supporting}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{copy.responseTime}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy.include}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        {copy.privacyNote}{" "}
        <Link
          href={privacyHref}
          className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copy.privacyLink}
        </Link>
      </p>

      <form
        className="mt-6 space-y-4"
        method="post"
        action="/api/contact"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="source" value={source} />
        {/* Honeypot — leave empty */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor={`${formId}-hp`}>Company website</label>
          <input
            id={`${formId}-hp`}
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-type`}
            className="label-mono text-sm tracking-[0.1em] text-ink/70"
          >
            {copy.enquiryType}
          </label>
          <select
            ref={enquiryRef}
            id={`${formId}-type`}
            name="enquiryType"
            value={enquiryType}
            onChange={(e) => {
              setEnquiryType(e.target.value);
              clearFieldError("enquiryType");
            }}
            className={fieldClass}
            aria-invalid={fieldErrors.enquiryType ? true : undefined}
            aria-describedby={describedBy(
              "enquiryType",
              `${formId}-type-error`,
            )}
            required
          >
            {copy.enquiryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldErrors.enquiryType ? (
            <p id={`${formId}-type-error`} className={errorClass} role="alert">
              {fieldErrors.enquiryType}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-name`}
            className="label-mono text-sm tracking-[0.1em] text-ink/70"
          >
            {copy.name}
          </label>
          <input
            ref={nameRef}
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            className={fieldClass}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={describedBy("name", `${formId}-name-error`)}
            required
          />
          {fieldErrors.name ? (
            <p id={`${formId}-name-error`} className={errorClass} role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-org`}
            className="label-mono text-sm tracking-[0.1em] text-ink/70"
          >
            {copy.org}
          </label>
          <input
            ref={orgRef}
            id={`${formId}-org`}
            name="org"
            autoComplete="organization"
            value={org}
            onChange={(e) => {
              setOrg(e.target.value);
              clearFieldError("org");
            }}
            className={fieldClass}
            aria-invalid={fieldErrors.org ? true : undefined}
            aria-describedby={describedBy("org", `${formId}-org-error`)}
            required
          />
          {fieldErrors.org ? (
            <p id={`${formId}-org-error`} className={errorClass} role="alert">
              {fieldErrors.org}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="label-mono text-sm tracking-[0.1em] text-ink/70"
          >
            {copy.email}
          </label>
          <input
            ref={emailRef}
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            className={fieldClass}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={describedBy("email", `${formId}-email-error`)}
            required
          />
          {fieldErrors.email ? (
            <p id={`${formId}-email-error`} className={errorClass} role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-message`}
            className="label-mono text-sm tracking-[0.1em] text-ink/70"
          >
            {copy.message}
          </label>
          <textarea
            ref={messageRef}
            id={`${formId}-message`}
            name="message"
            rows={compact ? 4 : 5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearFieldError("message");
            }}
            className={cx(fieldClass, "min-h-28 resize-y")}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={describedBy("message", `${formId}-message-error`)}
            required
          />
          {fieldErrors.message ? (
            <p
              id={`${formId}-message-error`}
              className={errorClass}
              role="alert"
            >
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        {formError && state !== "success" ? (
          <p className="text-sm text-accent" role="alert">
            {formError}
          </p>
        ) : null}

        {state === "success" ? (
          <p
            ref={successRef}
            tabIndex={-1}
            className="text-sm leading-relaxed text-ink/90"
            role="status"
          >
            {copy.success}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={state === "submitting"}
            className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/15 px-6 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
          >
            {state === "submitting" ? copy.submitting : copy.submit}
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="label-mono inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.copyEmail}
          </button>
          <a
            href={`mailto:${lab.contactEmail}`}
            className="label-mono inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-ink/75 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {lab.contactEmail}
          </a>
        </div>
      </form>
    </div>
  );
}

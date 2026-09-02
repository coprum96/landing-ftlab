"use client";

import { useId, useState, type FormEvent } from "react";
import { lab } from "@/data/lab";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

type FormState = "idle" | "opened" | "copied";

/**
 * Accessible partnership contact form.
 * Opens a prefilled mailto as the delivery path, with visible email fallback.
 */
export function PartnershipContactForm({ dict }: { dict: Dictionary }) {
  const copy = dict.pages.agenticAi.contactForm;
  const formId = useId();
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const composeBody = () =>
    [
      `Name: ${name.trim()}`,
      `Organization: ${org.trim()}`,
      `Reply-to: ${email.trim()}`,
      "",
      message.trim(),
    ].join("\n");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(copy.validation);
      return;
    }

    const href = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
      copy.mailSubject,
    )}&body=${encodeURIComponent(composeBody())}`;

    window.location.href = href;
    setState("opened");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(lab.contactEmail);
      setState("copied");
    } catch {
      setError(copy.copyFailed);
    }
  };

  const fieldClass =
    "mt-2 w-full border border-white/20 bg-[#0a0a0a] px-3 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div className="border border-white/15 bg-[#080808] p-5 md:p-7">
      <p className="text-base font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">
        {copy.supporting}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{copy.responseTime}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy.include}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="label-mono text-xs tracking-[0.1em] text-ink/70"
          >
            {copy.name}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-org`}
            className="label-mono text-xs tracking-[0.1em] text-ink/70"
          >
            {copy.org}
          </label>
          <input
            id={`${formId}-org`}
            name="organization"
            autoComplete="organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="label-mono text-xs tracking-[0.1em] text-ink/70"
          >
            {copy.email}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-message`}
            className="label-mono text-xs tracking-[0.1em] text-ink/70"
          >
            {copy.message}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cx(fieldClass, "resize-y min-h-28")}
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/15 px-6 py-3.5 text-xs tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.submit}
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="label-mono inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3.5 text-xs tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.copyEmail}
          </button>
          <a
            href={`mailto:${lab.contactEmail}`}
            className="label-mono inline-flex min-h-11 items-center text-xs tracking-[0.1em] text-ink/75 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {lab.contactEmail}
          </a>
        </div>

        <p className="sr-only" aria-live="polite">
          {state === "opened"
            ? copy.opened
            : state === "copied"
              ? copy.copied
              : ""}
        </p>
        {state === "opened" ? (
          <p className="text-sm leading-relaxed text-ink/80" role="status">
            {copy.opened}
          </p>
        ) : null}
        {state === "copied" ? (
          <p className="text-sm leading-relaxed text-ink/80" role="status">
            {copy.copied}
          </p>
        ) : null}
      </form>
    </div>
  );
}

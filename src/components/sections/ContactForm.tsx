"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import { serviceKeys } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 font-sans text-lg normal-case tracking-normal text-text placeholder:text-dim outline-none transition-colors duration-200 focus:border-signal";

const labelCls = "flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted focus-within:text-signal";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const ts = useTranslations("services.items");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      track("contact_submit", { service: String(data.service || "none") });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative" noValidate>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        <label className={labelCls}>
          {t("name")}
          <input name="name" required minLength={2} placeholder={t("namePlaceholder")} className={field} />
        </label>
        <label className={labelCls}>
          {t("contact")}
          <input name="contact" required minLength={3} placeholder={t("contactPlaceholder")} className={field} />
        </label>
        <label className={cn(labelCls, "sm:col-span-2")}>
          {t("service")}
          <span className="relative">
            <select name="service" defaultValue="" className={cn(field, "appearance-none pr-10 [&>option]:bg-bg")}>
              <option value="" disabled>
                {t("servicePlaceholder")}
              </option>
              {serviceKeys.map((key) => (
                <option key={key} value={ts(`${key}.title`)}>
                  {ts(`${key}.title`)}
                </option>
              ))}
              <option value={t("other")}>{t("other")}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-dim" />
          </span>
        </label>
        <label className={cn(labelCls, "sm:col-span-2")}>
          {t("message")}
          <textarea
            name="message"
            required
            minLength={5}
            rows={4}
            placeholder={t("messagePlaceholder")}
            className={cn(field, "resize-y")}
          />
        </label>
        {/* Honeypot, hidden from humans */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <Button type="submit" size="lg" arrow disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")}
        </Button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, transform: "translateX(12px)" }}
              animate={{ opacity: 1, transform: "translateX(0px)" }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm text-signal"
            >
              <CheckCircle2 className="size-4" /> {t("success")}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="err"
              initial={{ opacity: 0, transform: "translateX(12px)" }}
              animate={{ opacity: 1, transform: "translateX(0px)" }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm text-red-400"
            >
              <XCircle className="size-4" /> {t("error")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

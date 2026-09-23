"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown, Send, XCircle } from "lucide-react";
import { serviceKeys } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-dim outline-none transition-[border-color,box-shadow] duration-300 focus:border-cyan/60 focus:shadow-[0_0_0_3px_rgba(46,224,255,0.12)]";

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
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass relative rounded-3xl p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-text">
          {t("name")}
          <input name="name" required minLength={2} placeholder={t("namePlaceholder")} className={field} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-text">
          {t("contact")}
          <input name="contact" required minLength={3} placeholder={t("contactPlaceholder")} className={field} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-text sm:col-span-2">
          {t("service")}
          <span className="relative">
            <select name="service" defaultValue="" className={cn(field, "appearance-none pr-10")}>
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
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dim" />
          </span>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-text sm:col-span-2">
          {t("message")}
          <textarea
            name="message"
            required
            minLength={5}
            rows={5}
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Button type="submit" size="lg" icon={<Send />} disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")}
        </Button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm text-cyan"
            >
              <CheckCircle2 className="size-4" /> {t("success")}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="err"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
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

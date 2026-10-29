import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <section className="pt-16">
      <Container className="flex min-h-[70vh] flex-col justify-center py-24">
        <p className="label">
          <span className="text-signal">(404)</span> Not found
        </p>
        <h1 className="display-xl mt-6 text-text">
          Lost<span className="text-signal">.</span>
          <span className="ml-[0.06em] inline-block h-[0.72em] w-[0.42em] animate-blink bg-signal" />
        </h1>
        <div className="mt-12">
          <Button href="/" size="lg" arrow>
            {t("home")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

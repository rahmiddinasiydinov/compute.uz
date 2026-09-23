import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <section className="pt-[76px]">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="section-label">404</p>
        <h1 className="mt-4 text-5xl font-bold text-white sm:text-7xl">
          Page <span className="text-cyan">not found</span>
        </h1>
        <div className="mt-10">
          <Button href="/" arrow>
            {t("home")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

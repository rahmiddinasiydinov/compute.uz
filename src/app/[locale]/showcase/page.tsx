import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowcaseList } from "@/components/sections/Showcase";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    page: "showcase",
    title: t("pages.showcase.title"),
    description: t("pages.showcase.description"),
    keywords: t("keywords"),
  });
}

export default async function ShowcasePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("showcase");
  const nav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { page: "home", name: nav("home") },
            { page: "showcase", name: nav("showcase") },
          ]),
        ]}
      />
      <section className="pt-16">
        <Container className="pb-24 pt-20 lg:pb-36 lg:pt-32">
          <SectionHeading
            as="h1"
            index="W"
            label={t("label")}
            title={t.rich("page.title", {
              hl: (chunks) => <span className="text-signal">{chunks}</span>,
            })}
            text={t("page.text")}
            size="lg"
          />

          <ShowcaseList className="mt-20 lg:mt-28" />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { paths, localePath } from "@/lib/paths";

type LinkItem = { label: string; href: string };

/** Home section that links to the service and district pages. */
export async function Explore({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "homeExplore" });
  const services = t.raw("services.items") as LinkItem[];
  const areas = t.raw("areas.items") as LinkItem[];

  const pill =
    "inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 font-body text-sm text-text-primary transition-colors hover:bg-gray-50";

  return (
    <SectionWrapper id="explore">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")}{" "}
          <span className="font-accent italic">{t("titleAccent")}</span>
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-text-primary">{t("services.title")}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {services.map((item) => (
              <li key={item.href}>
                <Link href={`/${locale}${item.href}`} className={pill}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-text-primary">{t("areas.title")}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {areas.map((item) => (
              <li key={item.href}>
                <Link href={`/${locale}${item.href}`} className={pill}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href={localePath(locale, paths.areas.hub)} className="font-body text-sm font-semibold text-accent hover:underline">
              {t("areas.hubLabel")}
            </Link>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

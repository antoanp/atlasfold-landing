import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomePageJsonLd } from "@/components/home/json-ld";
import { getVisitorLocation } from "@/lib/geo";

/**
 * Dynamic import from Next.js. Only import components that are visible on the page.
 */
const Advantage = dynamic(() =>
  import("@/components/home/advantage").then((m) => m.Advantage),
);
const BeforeAfter = dynamic(() =>
  import("@/components/home/before-after").then((m) => m.BeforeAfter),
);
const RoiCalculator = dynamic(() =>
  import("@/components/home/roi-calculator").then((m) => m.RoiCalculator),
);
const Process = dynamic(() =>
  import("@/components/home/process").then((m) => m.Process),
);
const Faq = dynamic(() => import("@/components/home/faq").then((m) => m.Faq));
const Pricing = dynamic(() =>
  import("@/components/home/pricing").then((m) => m.Pricing),
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const userLocation = await getVisitorLocation(locale);

  return (
    <Fragment>
      <HomePageJsonLd locale={locale} />
      <Navbar />
      <main>
        <Hero userLocation={userLocation} />
        <Advantage />
        <BeforeAfter />
        <RoiCalculator />
        <Process />
        <Faq />
        <Pricing />
      </main>
      <Footer />
    </Fragment>
  );
}

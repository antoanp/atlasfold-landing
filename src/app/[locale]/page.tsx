import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Hero } from "@/components/sections/hero";
import { LeadCaptureProvider } from "@/components/sections/lead-capture-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getVisitorLocation } from "@/lib/geo";

/**
 * Dynamic import from Next.js. Only import components that are visible on the page.
 */
const Advantage = dynamic(() =>
  import("@/components/sections/advantage").then((m) => m.Advantage),
);
const BeforeAfter = dynamic(() =>
  import("@/components/sections/before-after").then((m) => m.BeforeAfter),
);
const Process = dynamic(() =>
  import("@/components/sections/process").then((m) => m.Process),
);
const Faq = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.Faq),
);
const Pricing = dynamic(() =>
  import("@/components/sections/pricing").then((m) => m.Pricing),
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const userLocation = await getVisitorLocation(locale);

  return (
    <Fragment>
      <JsonLd locale={locale} />
      <Navbar />
      <LeadCaptureProvider>
        <main>
          <Hero userLocation={userLocation} />
          <Advantage />
          <BeforeAfter />
          <Process />
          <Faq />
          <Pricing />
        </main>
      </LeadCaptureProvider>
      <Footer />
    </Fragment>
  );
}

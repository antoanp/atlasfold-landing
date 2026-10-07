import type { Metadata } from "next";
import { paths } from "@/lib/paths";
import {
  SeoLandingPage,
  buildSeoLandingMetadata,
} from "@/components/services/seo-landing-page";

type Props = { params: Promise<{ locale: string }> };

const PATH = paths.services.seoServices;
const NAMESPACE = "seoServicesPage" as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoLandingMetadata(locale, NAMESPACE, PATH);
}

export default async function SeoUslugiSofiaPage({ params }: Props) {
  const { locale } = await params;
  return <SeoLandingPage locale={locale} namespace={NAMESPACE} path={PATH} />;
}

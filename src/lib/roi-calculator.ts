/**
 * Pure calculation model for the home-page ROI calculator ("Is local SEO worth it?").
 *
 * Behavioural reference: the "Facciamo due conti…" widget on apexresults.it, reverse-engineered
 * from black-box input/output probing (no source or assets copied). The estimate chains four
 * conservative industry averages:
 *
 *   searches       = SEARCH_VOLUME[sector][citySize]      (lookup table)
 *   clicks         = round(searches × CLICK_RATE)         (~11% of searchers click a top-3 result)
 *   calls          = round(clicks   × CALL_RATE)          (~37% of those visitors call)
 *   jobs           = round(calls    × conversionRate)     (user-selected close rate)
 *   monthlyRevenue = round(jobs × avgClientValue)
 *   yearlyRevenue  = round(jobs × avgClientValue × 12)
 *
 * Every step rounds half-up (`Math.round`) before feeding the next, matching the reference.
 */

export const SECTORS = [
  "renovation",
  "lawyer",
  "dentist",
  "accountant",
  "physio",
  "psychologist",
  "plumber",
  "electrician",
  "locksmith",
  "realestate",
  "gardener",
  "architect",
  "notary",
  "pestcontrol",
  "petGrooming",
  "veterinary",
  "kinesitherapy",
  "florist",
  "aestheticClinic",
  "heatPump",
  "beautyNails",
  "catering",
  "smartHome",
  "bikeShop",
  "optician",
  "fireplace",
  "jewelry",
  "other",
] as const;

export const CITY_SIZES = ["small", "medium", "large"] as const;

export type Sector = (typeof SECTORS)[number];
export type CitySize = (typeof CITY_SIZES)[number];
export type ConversionRate = 0.2 | 0.25 | 0.33 | 0.5;

/** Conversion-rate dropdown options, in display order. `labelKey` resolves under the `conversions.*` namespace. */
export const CONVERSION_OPTIONS = [
  { value: 0.2, labelKey: "oneInFive" },
  { value: 0.25, labelKey: "oneInFour" },
  { value: 0.33, labelKey: "oneInThree" },
  { value: 0.5, labelKey: "oneInTwo" },
] as const satisfies ReadonlyArray<{ value: ConversionRate; labelKey: string }>;

export const CLICK_RATE = 0.11;
export const CALL_RATE = 0.37;
export const MONTHS_PER_YEAR = 12;

/** Monthly local-search volume by sector and city size — a hardcoded 2-D lookup (no clean factor decomposition). */
export const SEARCH_VOLUME: Record<Sector, Record<CitySize, number>> = {
  renovation: { small: 200, medium: 700, large: 2400 },
  lawyer: { small: 200, medium: 700, large: 2500 },
  dentist: { small: 180, medium: 650, large: 2300 },
  accountant: { small: 150, medium: 500, large: 1800 },
  physio: { small: 140, medium: 450, large: 1700 },
  psychologist: { small: 130, medium: 420, large: 1600 },
  plumber: { small: 300, medium: 900, large: 3200 },
  electrician: { small: 220, medium: 750, large: 2800 },
  locksmith: { small: 210, medium: 720, large: 2600 },
  realestate: { small: 160, medium: 600, large: 2100 },
  gardener: { small: 140, medium: 500, large: 1700 },
  architect: { small: 120, medium: 420, large: 1500 },
  notary: { small: 100, medium: 350, large: 1200 },
  pestcontrol: { small: 130, medium: 420, large: 1500 },
  petGrooming: { small: 120, medium: 400, large: 1400 },
  veterinary: { small: 200, medium: 700, large: 2400 },
  kinesitherapy: { small: 150, medium: 520, large: 1800 },
  florist: { small: 180, medium: 620, large: 2100 },
  aestheticClinic: { small: 170, medium: 580, large: 2000 },
  heatPump: { small: 140, medium: 480, large: 1700 },
  beautyNails: { small: 260, medium: 850, large: 3000 },
  catering: { small: 130, medium: 450, large: 1600 },
  smartHome: { small: 90, medium: 320, large: 1150 },
  bikeShop: { small: 140, medium: 480, large: 1700 },
  optician: { small: 190, medium: 650, large: 2300 },
  fireplace: { small: 110, medium: 380, large: 1350 },
  jewelry: { small: 150, medium: 520, large: 1850 },
  other: { small: 180, medium: 550, large: 2000 },
};

export type RoiInput = {
  sector: Sector;
  citySize: CitySize;
  conversionRate: ConversionRate;
  avgClientValue: number;
};

export type RoiResult = {
  searches: number;
  clicks: number;
  calls: number;
  jobs: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
};

export const DEFAULT_INPUT: RoiInput = {
  sector: "renovation",
  citySize: "medium",
  conversionRate: 0.33,
  avgClientValue: 5000,
};

/** Run the full estimate. `avgClientValue` is used raw (no clamp); non-finite values fall back to 0. */
export function calcRoi(input: RoiInput): RoiResult {
  const searches = SEARCH_VOLUME[input.sector][input.citySize];
  const clicks = Math.round(searches * CLICK_RATE);
  const calls = Math.round(clicks * CALL_RATE);
  const jobs = Math.round(calls * input.conversionRate);
  const value = Number.isFinite(input.avgClientValue) ? input.avgClientValue : 0;

  return {
    searches,
    clicks,
    calls,
    jobs,
    monthlyRevenue: Math.round(jobs * value),
    yearlyRevenue: Math.round(jobs * value * MONTHS_PER_YEAR),
  };
}

/** Format an integer euro amount for display, localized, with no decimals. */
export function formatEur(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a plain count (searches / clicks / calls / jobs) — no grouping, matching the reference. */
export function formatCount(value: number): string {
  return String(value);
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Long-form typography for MDX article bodies. Maps every element MDX can emit to
 * the site's documented class strings (see service pages) so blog prose matches
 * the rest of atlasfold.com without the `@tailwindcss/typography` plugin.
 */

const P = "font-body text-base leading-relaxed text-text-secondary";

function MdxLink({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const isAnchor = href.startsWith("#");
  const className = "font-medium text-accent hover:underline";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(isAnchor ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
    </a>
  );
}

function MdxImage({ src, alt = "" }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string" || src === "") return null;
  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full"
        style={{ width: "100%", height: "auto" }}
        loading="lazy"
      />
      {alt ? (
        <figcaption className="px-4 py-3 font-body text-xs text-text-secondary">{alt}</figcaption>
      ) : null}
    </figure>
  );
}

export const proseComponents = {
  h1: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-14 scroll-mt-24 font-display text-2xl font-extrabold text-text-primary lg:text-3xl" {...p} />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-14 scroll-mt-24 font-display text-2xl font-extrabold text-text-primary lg:text-3xl" {...p} />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 scroll-mt-24 font-display text-xl font-bold text-text-primary" {...p} />
  ),
  h4: (p: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-8 scroll-mt-24 font-display text-lg font-bold text-text-primary" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => <p className={cn("mt-5", P)} {...p} />,
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("mt-5 list-disc space-y-2 pl-5", P)} {...p} />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("mt-5 list-decimal space-y-2 pl-5", P)} {...p} />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...p} />,
  a: MdxLink,
  strong: (p: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text-primary" {...p} />
  ),
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 rounded-r-lg border-l-4 border-cta/40 bg-card py-3 pl-5 pr-4 font-body text-base italic text-text-primary"
      {...p}
    />
  ),
  hr: (p: ComponentPropsWithoutRef<"hr">) => <hr className="my-12 border-gray-200" {...p} />,
  img: MdxImage,
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary"
      {...p}
    />
  ),
  pre: (p: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl bg-text-primary p-4 font-mono text-sm leading-relaxed text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white"
      {...p}
    />
  ),
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse font-body text-sm" {...p} />
    </div>
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => (
    <th className="border border-gray-200 bg-card px-3 py-2 text-left font-semibold text-text-primary" {...p} />
  ),
  td: (p: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-gray-200 px-3 py-2 text-text-secondary" {...p} />
  ),
};

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="[&>*:first-child]:mt-0">

      {children}
    </div>
  );
}

import { useLocale, useTranslations } from "next-intl";
import type { PostMeta } from "@/lib/blog";
import { paths } from "@/lib/paths";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** `BlogPosting` + `BreadcrumbList` for a single article. */
export function ArticleJsonLd({ post, baseUrl }: { post: PostMeta; baseUrl: string }) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const url = `${baseUrl}${post.href}`;
  const image = post.ogImage
    ? `${baseUrl}${post.ogImage}`
    : `${baseUrl}/images/og-image.png`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale,
    ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    author: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: post.author,
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [image],
    url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${baseUrl}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumbBlog"),
        item: `${baseUrl}/${locale}/${paths.blog.hub}`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={blogPosting} />
      <JsonLd data={breadcrumb} />
    </>
  );
}

/** `Blog` + `ItemList` for the index. */
export function BlogIndexJsonLd({
  posts,
  baseUrl,
}: {
  posts: PostMeta[];
  baseUrl: string;
}) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const blogUrl = `${baseUrl}/${locale}/${paths.blog.hub}`;

  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    name: t("indexTitle"),
    description: t("indexTagline"),
    url: blogUrl,
    inLanguage: locale,
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}${p.href}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={blog} />
      <JsonLd data={itemList} />
    </>
  );
}

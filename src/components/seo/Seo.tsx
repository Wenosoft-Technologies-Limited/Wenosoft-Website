import { useEffect } from "react";

import { SITE, TWITTER_HANDLE } from "@/config/site";

interface SeoProps {
  /** Full page title — used verbatim as <title> and og:title */
  title: string;
  /** Meta description and og:description */
  description: string;
  /** Path component appended to SITE.url for canonical / og:url. Defaults to "/" */
  path?: string;
  /** Open Graph image URL — absolute, or root-relative to SITE.url */
  ogImage?: string;
  /** og:type override (default "website") */
  type?: "website" | "article" | "profile";
  /** Block indexing for this route (e.g. 404) */
  noIndex?: boolean;
  /** Structured data rendered as application/ld+json. One object or several. */
  jsonLd?: object | object[];
}

// Marker attribute so we only ever touch tags this component owns.
const MARK = "data-seo";

const ensureAbsolute = (urlOrPath: string): string =>
  /^https?:\/\//i.test(urlOrPath)
    ? urlOrPath
    : `${SITE.url}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;

function upsertMeta(key: string, keyAttr: "name" | "property", content: string): void {
  const selector = `meta[${keyAttr}="${key}"][${MARK}]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, key);
    el.setAttribute(MARK, "");
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(key: string, keyAttr: "name" | "property"): void {
  document.head.querySelector(`meta[${keyAttr}="${key}"][${MARK}]`)?.remove();
}

function upsertCanonical(href: string): void {
  const selector = `link[rel="canonical"][${MARK}]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    el.setAttribute(MARK, "");
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(json: string): void {
  const selector = `script[type="application/ld+json"][${MARK}]`;
  let el = document.head.querySelector<HTMLScriptElement>(selector);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute(MARK, "");
    document.head.appendChild(el);
  }
  el.textContent = json;
}

function removeJsonLd(): void {
  document.head.querySelector(`script[type="application/ld+json"][${MARK}]`)?.remove();
}

/**
 * Per-route document head management for a client-rendered SPA.
 *
 * Note: tags are written after JS hydration. Crawlers that execute JS
 * (Googlebot) see per-route metadata; static social crawlers fall back to
 * the defaults in public/index.html.
 */
export function Seo({
  title,
  description,
  path = "/",
  ogImage,
  type = "website",
  noIndex = false,
  jsonLd,
}: SeoProps): null {
  // Serialize for a stable effect dependency regardless of object identity.
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    const url = ensureAbsolute(path);
    const image = ensureAbsolute(ogImage ?? "/og-image.png");

    document.title = title;

    upsertMeta("description", "name", description);
    upsertCanonical(url);

    if (noIndex) {
      upsertMeta("robots", "name", "noindex, nofollow");
    } else {
      removeMeta("robots", "name");
    }

    upsertMeta("og:type", "property", type);
    upsertMeta("og:url", "property", url);
    upsertMeta("og:title", "property", title);
    upsertMeta("og:description", "property", description);
    upsertMeta("og:image", "property", image);

    upsertMeta("twitter:card", "name", "summary_large_image");
    upsertMeta("twitter:site", "name", TWITTER_HANDLE);
    upsertMeta("twitter:title", "name", title);
    upsertMeta("twitter:description", "name", description);
    upsertMeta("twitter:image", "name", image);

    if (jsonLdString) {
      upsertJsonLd(jsonLdString);
    } else {
      removeJsonLd();
    }
  }, [title, description, path, ogImage, type, noIndex, jsonLdString]);

  return null;
}

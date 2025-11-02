"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/app/contexts/SiteSettingsContext";

interface DynamicMetadataProps {
  pageTitle?: string;
  pageDescription?: string;
}

export default function DynamicMetadata({ pageTitle, pageDescription }: DynamicMetadataProps) {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!settings) return;

    // Update document title
    const baseTitle = settings.metadataTitle || "Joyo Tech ID";
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = pageDescription || settings.metadesc || "";

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    if (settings.metakeyword) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", settings.metakeyword);
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = settings.metakeyword;
        document.head.appendChild(meta);
      }
    }

    // Update OG tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) {
      ogTitle.setAttribute("content", document.title);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.content = document.title;
      document.head.appendChild(meta);
    }

    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [settings, pageTitle, pageDescription]);

  return null; // This component doesn't render anything
}

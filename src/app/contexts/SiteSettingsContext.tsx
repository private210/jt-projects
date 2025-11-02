"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SiteSettings {
  id: string;
  logo: string | null;
  nama_company: string;
  metadataTitle: string;
  favicon: string | null;
  metakeyword: string | null;
  metadesc: string | null;
}

interface SiteSettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/site-settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);

        // Update favicon dynamically
        if (data?.favicon) {
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (link) {
            link.href = data.favicon;
          } else {
            const newLink = document.createElement("link");
            newLink.rel = "icon";
            newLink.href = data.favicon;
            document.head.appendChild(newLink);
          }
        }

        // Update page title dynamically
        if (data?.metadataTitle) {
          document.title = data.metadataTitle;
        }
      }
    } catch (error) {
      console.error("Failed to fetch site settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    await fetchSettings();
  };

  return <SiteSettingsContext.Provider value={{ settings, loading, refreshSettings }}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
}

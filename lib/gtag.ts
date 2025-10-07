// src/lib/gtag.ts

// Global window tipini kengaytiramiz
declare global {
  interface Window {
    gtag: (...args: GtagFunctionArgs) => void;
  }

  type GtagFunctionArgs =
    | ["js", Date]
    | ["config", string, Record<string, unknown>?]
    | ["event", string, Record<string, unknown>?];
}

// ❗️ TypeScript faylda global tiplar ishlatilsa export {} yozilishi shart
export {};

export const GA_TRACKING_ID = "G-FFMK11Z2BV";

// Sahifa ko‘rish (pageview) jo‘natish
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Hodisa/event jo‘natish
type GtagEventProps = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: GtagEventProps) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

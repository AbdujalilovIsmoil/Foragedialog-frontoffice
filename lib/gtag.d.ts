// src/lib/gtag.d.ts

export {};

declare global {
  interface Window {
    gtag: (...args: GtagFunctionArgs) => void;
  }

  type GtagFunctionArgs =
    | ["js", Date]
    | ["config", string, Record<string, unknown>?]
    | ["event", string, Record<string, unknown>?];
}

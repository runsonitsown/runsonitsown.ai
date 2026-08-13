export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type AttributionKey = (typeof attributionKeys)[number];
export type Attribution = Record<AttributionKey, string>;

const storageKey = "rio_first_touch_attribution";

function emptyAttribution(): Attribution {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    fbclid: "",
  };
}

function cleanValue(value: string | null) {
  return (value ?? "").trim().slice(0, 500);
}

function readCurrentAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const attribution = emptyAttribution();
  for (const key of attributionKeys) attribution[key] = cleanValue(params.get(key));
  return attribution;
}

function readStoredAttribution(): Attribution {
  const attribution = emptyAttribution();
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(storageKey) ?? "{}") as Record<
      string,
      unknown
    >;
    for (const key of attributionKeys) {
      attribution[key] = typeof stored[key] === "string" ? cleanValue(stored[key]) : "";
    }
  } catch {
    return attribution;
  }
  return attribution;
}

export function captureFirstTouchAttribution() {
  const stored = readStoredAttribution();
  const current = readCurrentAttribution();
  const merged = emptyAttribution();
  let hasValue = false;

  for (const key of attributionKeys) {
    merged[key] = stored[key] || current[key];
    if (merged[key]) hasValue = true;
  }

  if (hasValue) {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(merged));
    } catch {
      // Current URL values remain available when browser storage is blocked.
    }
  }

  return merged;
}

export function getFirstTouchAttribution() {
  return captureFirstTouchAttribution();
}

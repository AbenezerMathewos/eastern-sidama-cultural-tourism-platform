import { API_ORIGIN } from "@/lib/api";

export function resolveMediaUrl(url?: string | null, fallback = "") {
  if (!url) return fallback;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url.startsWith("/uploads/")) {
    return `${API_ORIGIN}${url}`;
  }

  return url;
}

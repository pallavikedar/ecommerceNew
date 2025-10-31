export const BACKEND_BASE = "http://184.168.123.27:9080/api"
// If your API is nested (e.g. /api/v1), set it here. Otherwise keep as empty string.
export const API_PREFIX: string = "" // e.g. "/api/v1"

// Safe join for path parts
export function joinPath(...parts: string[]) {
  return parts
    .filter(Boolean)
    .map((p, i) => (i === 0 ? p.replace(/\/+$/g, "") : p.replace(/^\/+|\/+$/g, "")))
    .join("/")
}

export function targetUrl(pathSegments: string[], search: string) {
  const prefix = API_PREFIX ? API_PREFIX.replace(/\/+$/g, "") : ""
  const base = BACKEND_BASE.replace(/\/+$/g, "")
  const path = joinPath(prefix, ...pathSegments)
  return `${base}/${path}${search || ""}`
}

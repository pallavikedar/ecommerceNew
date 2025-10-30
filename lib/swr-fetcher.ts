export async function fetchJSON<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed ${res.status}: ${text || res.statusText}`)
  }
  const ct = res.headers.get("content-type") || ""
  if (ct.includes("application/json")) {
    return res.json()
  }
  // fallback: attempt json else return as any
  try {
    return await res.json()
  } catch {
    return (await res.text()) as any
  }
}

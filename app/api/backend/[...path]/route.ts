import { NextResponse } from "next/server"
import { targetUrl } from "@/lib/backend"

async function forward(req: Request, pathSegments: string[]) {
  const url = new URL(req.url)
  const search = url.search || ""
  const dest = targetUrl(pathSegments, search)

  const init: RequestInit = {
    method: req.method,
    headers: new Headers(req.headers),
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
    // credentials are not forwarded cross-origin; your LAN usually doesn't need cookies
  }

  // Remove host header to avoid invalid host on backend
  init.headers.delete("host")

  const res = await fetch(dest, init)
  const headers = new Headers(res.headers)
  // Optionally strip hop-by-hop/unsafe headers
  headers.delete("content-encoding")
  headers.delete("transfer-encoding")
  headers.delete("connection")

  const body = await res.arrayBuffer()
  return new NextResponse(body, {
    status: res.status,
    headers,
  })
}

export async function GET(req: Request, ctx: { params: { path: string[] } }) {
  return forward(req, ctx.params.path || [])
}
export async function POST(req: Request, ctx: { params: { path: string[] } }) {
  return forward(req, ctx.params.path || [])
}
export async function PUT(req: Request, ctx: { params: { path: string[] } }) {
  return forward(req, ctx.params.path || [])
}
export async function PATCH(req: Request, ctx: { params: { path: string[] } }) {
  return forward(req, ctx.params.path || [])
}
export async function DELETE(req: Request, ctx: { params: { path: string[] } }) {
  return forward(req, ctx.params.path || [])
}

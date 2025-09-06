import { NextRequest } from "next/server";

const API_BASE = "https://perenual.com/api";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const key = process.env.PERENUAL_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: "PERENUAL_API_KEY is not set in environment." }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const url = `${API_BASE}/species/details/${params.id}?key=${key}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      const text = await res.text();
      return new Response(text, { status: res.status });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

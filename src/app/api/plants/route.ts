import { NextRequest } from "next/server";

const API_BASE = "https://perenual.com/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const q = searchParams.get("q") || "";
    const indoor = searchParams.get("indoor") || ""; // optional

    const key = process.env.PERENUAL_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: "PERENUAL_API_KEY is not set in environment." }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const params = new URLSearchParams({ key, page });
    if (q) params.set("q", q);
    if (indoor) params.set("indoor", indoor);

    const url = `${API_BASE}/species-list?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
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

import { NextResponse } from "next/server";

const BASE_URL = "https://erskinemay-api.parliament.uk";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const apiPath = `/api/${path.join("/")}`;

  try {
    const res = await fetch(`${BASE_URL}${apiPath}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Erskine May API returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach Erskine May API. Consult the Table Office." },
      { status: 502 }
    );
  }
}

export const config = {
  runtime: "edge",
};

export default function handler(request) {
  const city = request.headers.get("x-vercel-ip-city") || "Unknown City";
  const region =
    request.headers.get("x-vercel-ip-country-region") || "Unknown Region";

  return new Response(JSON.stringify({ city, region }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store, no-cache",
    },
  });
}

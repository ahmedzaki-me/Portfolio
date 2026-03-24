export default function handler(req, res) {
  const city = req.headers["x-vercel-ip-city"];
  const region = req.headers["x-vercel-ip-region"];
  const country = req.headers["x-vercel-ip-country"];

  res.json({
    city: city ? decodeURIComponent(city) : null,
    region: region ? decodeURIComponent(region) : null,
    country: country || null,
  });
}

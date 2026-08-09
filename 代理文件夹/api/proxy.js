module.exports = async (req, res) => {
  // 允许你的Github Pages域名跨域
  res.setHeader("Access-Control-Allow-Origin", "https://xujunwei03.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: "缺少url参数" });
    }
    const fetch = await import("node-fetch");
    const response = await fetch.default(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
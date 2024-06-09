// const nanoid = require("nanoid");
const urlModel = require("../models/urlmodel");
const shortid = require("shortid");

async function handleCreateshortUrl(req, res) {
  const shortId = shortid();
  const everyExistingUrl = await urlModel.find({});
  const shortUrl = req.params.shortUrl;
  const entry = await urlModel.findOne({ shortUrl });
  if (!req.body || !req.body.url)
    return res.status(400).json({ msg: "bad request" });
  const createdid = await urlModel.create({
    shortUrl: shortId,
    longUrl: req.body.url,
    viewHistory: [],
  });
  return res.render(
    "home",
    {
      allurls: everyExistingUrl,
      entry: entry,
    }
  );
}

async function handlelongUrl(req, res) {
  const shortUrl = req.params.shortid;

  const foundUrl = await urlModel.findOneAndUpdate(
    { shortUrl },
    { $push: { viewHistory: { timestamp: Date.now() } } }
  );

  if (!foundUrl) {
    return res.status(404).json({ msg: "Short URL not found" });
  }

  return res.json(foundUrl.longUrl);
}

async function handleStats(req, res) {
  const shortUrl = req.params.shortUrl;
  const entry = await urlModel.findOne({ shortUrl });
  if (!entry) {
    return res.status(404).json({ msg: "Short URL not found" });
  }
  // return res.json({
  //   totalVisits: entry.viewHistory.length,
  //   stats: entry.viewHistory,
  // });
}

async function handleHomePageRender(req, res) {
  const allUrlfromModel = await urlModel.find({});
  return res.render("home", {
    urls: allUrlfromModel,
  });
}

module.exports = {
  handleCreateshortUrl,
  handlelongUrl,
  handleStats,
  handleHomePageRender,
};

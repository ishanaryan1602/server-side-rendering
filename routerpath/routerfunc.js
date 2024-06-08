const urlModel = require("../models/urlmodel");
const shortid = require("shortid");

async function handleCreateshortUrl(req, res) {
  const shortId = shortid();
  if (!req.body || !req.body.url)
    return res.status(400).json({ msg: "bad request" });
  const createdid = await urlModel.create({
    shortUrl: shortId,
    longUrl: req.body.url,
    viewHistory: [],
  });
  return res.json({ url: createdid.shortUrl });
}

async function handlelongUrl(req, res) {
  const shortUrl = req.params.shortid; // Assuming the parameter is 'shortid'

  const foundUrl = await urlModel.findOneAndUpdate(
    { shortUrl },
    { $push: { viewHistory: { timestamp: Date.now() } } }
  );

  if (!foundUrl) {
    return res.status(404).json({ msg: "Short URL not found" });
  }

  return res.redirect(foundUrl.longUrl); // Assuming you want to redirect
}


async function handleStats(req, res) {
  const shortUrl = req.params.shortUrl;
  const entry = await urlModel.findOne({ shortUrl });
  if (!entry) {
    return res.status(404).json({ msg: "Short URL not found" });
  }
  return res.json({
    totalVisits: entry.viewHistory.length,
    stats: entry.viewHistory,
  });
}

module.exports = {
  handleCreateshortUrl,
  handlelongUrl,
  handleStats,
};


// {$push: {
//   viewHistory: {
//     timestamp: Date.now(),
//   },
// }},
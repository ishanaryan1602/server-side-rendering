const express = require("express");
const {
  handlelongUrl,
  handleCreateshortUrl,
  handleStats,
  handleHomePageRender
} = require("./routerfunc");

const router = express.Router();

router.post("/url", handleCreateshortUrl);

router.get("/:shortid", handlelongUrl);

router.get("/stats/:shortUrl", handleStats);

router.get("/", handleHomePageRender);

module.exports = router;

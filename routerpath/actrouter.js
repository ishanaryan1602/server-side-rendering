const express = require("express");
const {
  handlelongUrl,
  handleCreateshortUrl,
  handleStats,
  handleTestEjs
} = require("./routerfunc");

const router = express.Router();

router.post("/url", handleCreateshortUrl);

router.get("/:shortid", handlelongUrl);

router.get("/stats/:shortUrl", handleStats);

router.get("/test/report", handleTestEjs);

module.exports = router;

const express = require("express");

const postDb = require("./postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Could not grab post data"
    });
  }
});

router.get("/:id", validatePostId, (req, res) => {});

router.delete("/:id", validatePostId, (req, res) => {});

router.put("/:id", validatePostId, (req, res) => {});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await postDb.getById(id);
    if (post) {
      //By setting req.post with the above async, the value is being passed down
      //To next async function.
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  } catch (err) {
    next({ message: "Failed to process request" });
  }
}

module.exports = router;

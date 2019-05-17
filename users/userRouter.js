const express = "express";

const userDb = require("./userDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  try {
  } catch (err) {}
});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving the users" });
  }
});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userDb.getById(id);
    if (user) {
      //storing values pulled from request into req.user
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (err) {
    next();
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;

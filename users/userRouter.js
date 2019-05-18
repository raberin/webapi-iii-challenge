const express = require("express");

const userDb = require("./userDb.js");
const postsDb = require("../");

const router = express.Router();

const validateIdUser = [validateUserId, validateUser];
const validateIdPost = [validateUserId, validatePost];

//Post - Works /api/users/
router.post("/", validateUser, async (req, res) => {
  try {
    //Set user to data
    const user = await userDb.insert(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error adding user"
    });
  }
});

// router.post("/:id/posts", validateIdPost, (req, res) => {
//   try {

//   } catch(err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error adding user"
//     });
//   }

// });

//Works /api/users
router.get("/", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving the users" });
  }
});

//Works /api/users/id
router.get("/:id", validateUserId, async (req, res) => {
  // try {
  //   const user = await userDb.getById(req.params.id);
  //   res.status(200).json(user);
  // } catch (err) {
  //   res.status(500).json({ message: "Error retrieving the user" });
  // }

  //Since I pulled the user data form validateUserId middleware
  res.status(200).json(req.user);
});

//  /api/users/id/posts
// router.get("/:id/posts", validateUserId, (req, res) => {
//   try {

//   } catch(err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error adding user"
//     });
//   }
// });

//words /api/users/id
router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const deletedUser = await userDb.remove(req.params.id);
    if (deletedUser > 0) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error deleting user"
    });
  }
});

router.put("/:id", validateIdUser, async (req, res) => {
  try {
    const updateUser = await userDb.update(req.params.id, req.body);
    const updated = await userDb.getById(req.params.id);
    if (updateUser) {
      res.status(200).json({
        message: `This user has been updated from ${req.user.name} to ${
          updated.name
        }`
      });
    } else {
      res.status(404).json({ meesage: "The user could not be found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error updating user"
    });
  }
});

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
      res.status(400).json({ message: "missing or not valid id" });
    }
  } catch (err) {
    next();
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;

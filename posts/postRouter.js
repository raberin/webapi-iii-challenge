const express = 'express';

const postDb = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', validatePostId, (req, res) => {

});

router.delete('/:id', validatePostId, (req, res) => {

});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await  postDb.getById(id);
    if(post) {
      //By setting req.post with the above async, the value is being passed down 
      //To next async function. 
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: 'invalid post id'})
    }

  } catch (err) {
    next({ message: "Failed to process request"})
  }
};

module.exports = router;
const router = require("express").Router();
const { Comment, User } = require('../../../Models');
const withAuth = require('../../../Utils/auth');

router.post('/comment/', withAuth, async (req, res) => {
    try { 
      const commentData = await Comment.create({
      comment: req.body.comment,
      date_created: req.body.date_created,
      username: req.body.username,
    });
    // if the dish is successfully created, the new response will be returned as json
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
  });
  
  router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          username: req.session.username,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  module.exports = router;
  
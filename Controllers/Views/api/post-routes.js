const router = require('express').Router();
const { Post } = require('../../../Models');
const withAuth = require('../../../Utils/auth');

// route to create/add a dish using async/await
router.post('/', withAuth, async (req, res) => {
  try { 
    const postData = await Post.create({
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
    date_created: req.body.date_created,
  });
  // if the dish is successfully created, the new response will be returned as json
  res.status(200).json(postData);
} catch (err) {
  res.status(400).json(err);
}
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

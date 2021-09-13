const router = require("express").Router();

const { Post, Comment, User } = require("../../Models");

// route to get all posts
router.get("/", async (req, res) => {
  try {
  const postData = await Post.findAll({
    include: [{ model: Post, User, Comment }],
  });
  res.status(200).json(postData);
} catch (err) {
  res.status(500).json(err);
}
});
   
// route to get one post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Post, User, Comment }],
    });
    
      if (!postData) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }  
});

module.exports = router;

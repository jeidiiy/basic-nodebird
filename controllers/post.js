const Post = require('../models/post');

exports.removePost = async (req, res, next) => {
  try {
    await Post.destroy({ where: { id: parseInt(req.params.id, 10) } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
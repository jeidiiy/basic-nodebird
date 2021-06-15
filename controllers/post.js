const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.addPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^s#]+/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        }),
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.removePost = async (req, res, next) => {
  try {
    await Post.destroy({ where: { id: parseInt(req.params.id, 10) } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

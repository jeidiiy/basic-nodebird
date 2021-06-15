jest.mock('../models/post');
jest.mock('../models/hashtag');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');
const { addPost, removePost } = require('./post');

describe('addPost', () => {
  const req = {
    body: { content: 'hi', url: 'http://localhost' },
    user: { id: 1 },
  };
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();

  test('게시글을 추가하고 메인 페이지로 리다이렉트', async () => {
    Post.create.mockReturnValue(
      Promise.resolve({
        addHashtags(arr) {
          return Promise.resolve(true);
        },
      }),
    );

    Hashtag.findOrCreate.mockReturnValue(Promise.resolve({}));

    await addPost(req, res, next);
    expect(res.redirect).toBeCalledWith('/');
  });
});

describe('removePost', () => {
  const req = {
    params: { id: 1 },
  };
  const res = {
    sendStatus: jest.fn(),
  };
  const next = jest.fn();

  test('자신의 게시글을 삭제한 후 200 응답을 보냄', async () => {
    Post.findOne.mockReturnValue(
      Promise.resolve({
        removePost(id) {
          return Promise.resolve(true);
        },
      }),
    );
    await removePost(req, res, next);
    expect(res.sendStatus).toBeCalledWith(200);
  });
});

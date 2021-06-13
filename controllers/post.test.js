jest.mock('../models/post');
const Post = require('../models/post');
const { removePost } = require('./post');

describe('removePost', () => {
  const req = {
    params: { id: 1 },
  };
  const res = {
    sendStatus: jest.fn(),
  };
  const next = jest.fn();

  test('자신의 게시글을 삭제한 후 200 응답을 보냄', async () => {
    Post.findOne.mockReturnValue(Promise.resolve({
      removePost(id) {
        return Promise.resolve(true);
      },
    }));
    await removePost(req, res, next);
    expect(res.sendStatus).toBeCalledWith(200);
  });
});
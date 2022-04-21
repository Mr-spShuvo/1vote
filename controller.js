const Vote = require('./model').Vote;

const VoteController = {};

VoteController.create = async (req, res) => {
  const { color, fingerprint } = req.body;
  const isExist = await Vote.findOne({ fingerprint });
  if (isExist) {
    req.session.context = { status: 'You have already voted' };
    return res.redirect('/');
  }

  try {
    await Vote.create({ color, fingerprint });
    req.session.context = { status: 'Your vote has been recorded!' };
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    req.session.context = { status: 'Something went wrong!' };
    return res.redirect('/');
  }
};

VoteController.getCount = async (req, res) => {
  const red = await Vote.find({ color: 'red' }).countDocuments();
  const blue = await Vote.find({ color: 'blue' }).countDocuments();
  const green = await Vote.find({ color: 'green' }).countDocuments();
  const context = req.session.context;
  // console.log(red, blue, green);
  return res.render('index', { count: { red, blue, green }, ...context });
};

module.exports = {
  Vote: VoteController
};

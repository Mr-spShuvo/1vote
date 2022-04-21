const router = require('express').Router();
const VoteController = require('./controller').Vote;

router.post('/', VoteController.create);
router.get('/', VoteController.getCount);

module.exports = router;

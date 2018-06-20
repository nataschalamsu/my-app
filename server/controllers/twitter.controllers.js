const OAuth = require('oauth');
const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.APP_TKN,
  process.env.APP_SCRT,
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = {
  postTweet: (req, res) => {
    oauth.post(
      `https://api.twitter.com/1.1/statuses/update.json`,
      process.env.USER_TOKEN, //test user token
      process.env.USER_SCRT, //test user secret    
      {status: req.body.status},
      function (err, data, result) {
        if (err) {
          res
            .status(400)
            .json(
              err
            )
        } else {
          res
            .status(200)
            .json(JSON.parse(data))
        }   
      })
  }
}
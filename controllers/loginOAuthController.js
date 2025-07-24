const passport = require('passport');

const login2 = passport.authenticate('google', {
  scope: ['profile', 'email']
});

module.exports = login2;

//ensureAuth is a function checking to see if user is authenticated, if yes, move onto next thing, if no, redirect back to root
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  
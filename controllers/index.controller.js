
exports.homePage = function (req,res)  {
    res.render ('index')
}

exports.signinPage = function (req, res)  {
    res.render ('signin')
  }
  
exports.signupPage = function (req, res) {
    res.render ('signup')
}

exports.delete = function (req, res) {
    res.render ('delete')
}
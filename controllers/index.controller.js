
exports.homePage = function (req,res)  {
    res.render ('index'
   , {style:'style.css'}
    )
}

exports.signinPage = function (req, res)  {
    res.render ('signin',{style:'signin.css'})
  }
  
exports.companySignupPage = function (req, res) {
    res.render ('company_signup',{style:'company_signup.css'})
}

exports.candidateSignupPage = function (req, res) {
    res.render ('candidate_signup',{style:'candidate_signup.css'})
}

exports.delete = function (req, res) {
    res.render ('delete')
}

exports.homePage = function (req,res)  {
    res.render ('create_test'
   , {style:'create_test.css'}
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
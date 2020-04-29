const http = require("http")

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

exports.addQuestionMCQ = function (req, res) {
    res.render ('create_test',{style:'create_test.css'})
}

exports.addQuestionSubjective = function (req, res) {
    res.render ('add_question_subjective',{style:'add_question_subjective.css'})
}

exports.resetPassword = function (req, res) {
    res.render ('reset_password',{style:'reset_password.css'})
}

exports.verifyEmail = function (req, res) {
    res.render ('verify_email',{style:'signin.css'})
}

exports.createTest= function (req, res) {
    res.render ('create_test',{style:'create_test.css'})
}

exports.companyDashboard = function (req, res) {
    console.log(req.cookies.authorization)
    //get user data based on token 
  
    var promises = []
    var data = {}
    if (req.cookies.authorization) {
        var recentTestPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/company",
                method: "GET",
                headers: { authorization: req.cookies.authorization }
            }

            // Make http request
            const httpReq = http.request(options, httpRes => {
                var buff = ""
                httpRes.on("data", chunks => {
                    buff += chunks
                })

                httpRes.on("end", () => {
                    if (httpRes.statusCode === 200) {
                        data.recentTest = JSON.parse(buff)
                        resolve()
                    }
                    else {
                        reject(JSON.parse(buff))
                    }

                })
            })

            httpReq.on("error", error => {
                reject(error)
            })

            httpReq.end()
        })
        promises.push(recentTestPromise)
        Promise.all(promises).then(() => {
          //  data.style='company_dashboard.css'
            // data.layout='layout2.hbs'
            console.log(data)
           
            res.render("company_dashboard",{data,style:'company_dashboard.css'})
            
        }).catch(error => {
            console.log(error)
            res.render("error", error)
        })
    }



//    res.render ('company_dashboard',{style:'company_dashboard.css'})
}

exports.createTest = async (req, res) => {
    res.render ('create_test',{style:'create_test.css'})
}

exports.addQuestion = async (req, res) => {
    data.tid = req.params.tid
    res.render ('add_question', {style:'add_question.css', data})
}
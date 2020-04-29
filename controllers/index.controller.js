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

exports.resetPassword = function (req, res) {
    res.render ('reset_password',{style:'reset_password.css'})
}

exports.verifyEmail = function (req, res) {
    res.render ('verify_email',{style:'signin.css'})
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
        console.log('this is data')
        console.log(data)

        Promise.all(promises).then(() => {
          console.log(data)
         // document.cookie="userName="+data.userName
            res.render("company_dashboard",{data,style:'company_dashboard.css'})
            
        }).catch(error => {
           
            res.render("error", error)
        })
    }
}

exports.createTest = async (req, res) => {
    res.render ('create_test',{style:'create_test.css'})
}

exports.addQuestion = async (req, res) => {
    let data = {}
    data.tid = req.params.tid
    res.render('add_question', {style:'add_question.css',layout:'layout2.hbs' ,data})
}

exports.companyProfile = async (req, res) => {
    var promises = []
    var data = {}
    if (req.cookies.authorization) {
        var profilePromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/company/profile",
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
                        data = JSON.parse(buff)
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
        promises.push(profilePromise)
        Promise.all(promises).then(() => {
            res.render("company_profile",{data,style:'company_profile.css'})
            
        }).catch(error => {
           
            res.render("error", error)
        })
    }
}
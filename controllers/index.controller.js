const http = require("http")

exports.homePage = function (req,res)  {
    res.render ('index2'
   , {style:'style2.css'}
    )
}



exports.signinPage = function (req, res)  {
    res.render ('signin',{style:'signin.css'})
  }
  
exports.signupPage = function (req, res) {
    res.render ('company_signup',{style:'company_signup.css'})
}

exports.resetPassword = function (req, res) {
    res.render ('reset_password',{style:'reset_password.css'})
}

exports.verifyEmail = function (req, res) {
    res.render ('verify_email',{style:'signin.css'})
}

exports.companyDashboard = function (req, res) {
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

exports.editTest = async (req, res) => {
    let data ={}
    let promises=[]
    let tid=req.params.tid

    if (req.cookies.authorization) {
        var editTestPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: `/company/test/${tid}`,
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
                        data.editTest = JSON.parse(buff)
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
        promises.push(editTestPromise)

        Promise.all(promises).then(() => {        
          res.render ('edit_test',{style:'edit_test.css',layout:'layout2.hbs',data})
            
        }).catch(error => {
           
            res.render("error", error)
        })
    }
   
   
   
   
    // data.name = req.params.name
    // data.duration = req.params.duration
    // data.questions = req.params.questions
    // console.log('questions: '+data.questions)
    
}

exports.editQuestion = async (req, res) => {
    let data = {}
    data.tid = req.params.tid
    data.qid = req.params.qid   
    data.question = req.params.question
    data.type = req.params.type
    data.optionA = req.params.optionA 
    data.optionB = req.params.optionB
    data.optionC = req.params.optionC 
    data.optionD = req.params.optionD 
    data.correct = req.params.correct 
    data.score = req.params.score 
    res.render ('edit_question',{style:'edit_question.css',layout:'layout2.hbs',data})
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
            res.render("company_profile",{data,style:'company_profile.css',layout:'layout2.hbs'})
            
        }).catch(error => {
           
            res.render("error", error)
        })
    }
}

exports.viewAllTests = async (req, res) => {
    var promises = []
    var data = {}
    if (req.cookies.authorization) {
        var allTestPromise = new Promise((resolve, reject) => {
            // Create options
            const options = {
                hostname: req.hostname,
                port: 3000,
                path: "/company/tests",
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
                        data.tests = JSON.parse(buff)
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
        promises.push(allTestPromise)

        Promise.all(promises).then(() => {
            res.render("all_tests",{data,style:'all_tests.css',layout:'layout2.hbs'})
            
        }).catch(error => {
           
            res.render("error", error)
        })
    }
}

exports.invite = async (req, res) => {
  let data = {}
   data.tid = req.params.tid
   res.render ('invite',{data, style:'invite.css',layout:'layout2.hbs'})
}

exports.candidateDashboard = async (req, res) => {
    res.render ('candidate_dashboard',{style:'candidate_dashboard.css'})
}
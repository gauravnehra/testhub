function validate() {
    let uType = document.getElementById('user-type').value;
    if (uType == 'business') {
        // for company
        let name = document.getElementById('name').value;
        let domain = document.getElementById('domain').value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let location = document.getElementById('location').value;
        let nameErr = domainErr = emailErr = passwordErr = locationErr = true;

        // valid company name
        if (name == "") {
            printError("Please enter your name");
        }
        else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(name) === false) {
                printError("Please enter a valid name");
            }
            else {
                nameErr = false;
            }
        }

        // valid domain if entered
        if (domain == "") {
            domainErr = false;
        }
        else {
            var regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
            if (regex.test(domain) === false) {
                printError("Please enter a valid domain");
            }
            else {
                domainErr = false;
            }
        }

        // valid email
        if (email == "") {
            printError("Please enter your email address");
        }
        else {
            var regex = /^\S+@\S+\.\S+$/;
            if (regex.test(email) === false) {
                printError("Please enter a valid email address");
            } else {
                emailErr = false;
            }
        }

        // password
        if (password == "") {
            printError("Please enter a password")
        }
        else {
            passwordErr = false
        }

        // valid location
        if (location == "") {
            printError("Please enter your company's location");
        }
        else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(location) === false) {
                printError("Please enter a valid location");
            }
            else {
                locationErr = false;
            }
        }


        if ((nameErr || domainErr || emailErr || passwordErr || locationErr) == true) {
            return false;
        }
        else {
            signUp()
        }

    }
    else if (uType == 'candidate') {
        //for candidate
        let fName = document.getElementById('first_name').value
        let lName = document.getElementById('last_name').value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let age = document.getElementById('age').value
        let location = document.getElementById('location').value
        let fNameErr = lNameErr = emailErr = passwordErr = locationErr = ageErr = true;

        // valid first name
        if (fName == "") {
            printError("Please enter your first name");
        }
        else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(fName) === false) {
                printError("Please enter a valid first name");
            }
            else {
                fNameErr = false;
            }
        }
        // valid last name
        if (lName == "") {
            printError("Please enter your last name");
        }
        else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(lName) === false) {
                printError("Please enter a valid last name");
            }
            else {
                lNameErr = false;
            }
        }

        // valid email
        if (email == "") {
            printError("Please enter your email address");
        }
        else {
            var regex = /^\S+@\S+\.\S+$/;
            if (regex.test(email) === false) {
                printError("Please enter a valid email address");
            } else {
                emailErr = false;
            }
        }

        // valid password
        if (password == "") {
            printError("Please enter a password")
        }
        else {
            passwordErr = false
        }

        // valid location
        if (location == "") {
            printError("Please enter your location");
        }
        else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(location) === false) {
                printError("Please enter a valid location");
            }
            else {
                locationErr = false;
            }
        }

        // valid age
        if(age < 10 || age > 90) {
            printError("Please enter a valid age between 10 and 90")
        }
        else {
            ageErr = false;
        }

        if ((fNameErr || lNameErr || emailErr || passwordErr || locationErr || ageErr) == true) {
            return false;
        }
        else {
            signUp()
        }
    }
}

function printError(msg) {
    let p = document.createElement("p")
    p.innerText = msg
    document.getElementById("error").classList.add("alert", "alert-danger")
    document.getElementById("error").appendChild(p)
}
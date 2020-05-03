function validate() {
    let name = document.getElementById('candidate_name').value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let age = document.getElementById('age').value
    let location = document.getElementById('location').value
    let nameErr = emailErr = passwordErr = locationErr = ageErr = true;

    // valid first name
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
    if (age < 10 || age > 90) {
        printError("Please enter a valid age between 10 and 90")
    }
    else {
        ageErr = false;
    }

    if ((nameErr || emailErr || passwordErr || locationErr || ageErr) == true) {
        return false;
    }
    else {
        update()
    }
}

function printError(msg) {
    let p = document.createElement("p")
    p.innerText = msg
    document.getElementById("error").classList.add("alert", "alert-danger")
    document.getElementById("error").appendChild(p)
}
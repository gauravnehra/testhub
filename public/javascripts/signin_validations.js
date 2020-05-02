function validate() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

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

    if ((emailErr || passwordErr) == true) {
        return false;
    }
    else {
        alert("submit")
    }
}

function printError(msg) {
    let p = document.createElement("p")
    p.innerText = msg
    document.getElementById("error").classList.add("alert", "alert-danger")
    document.getElementById("error").appendChild(p)
}
function validate() {
    let name = document.getElementById("test_name").value;
    let duration = document.getElementById("duration").value;
    let nameErr = durationErr = true

    // valid test name
    if (name == "") {
        printError("Please enter test name");
    }
    else {
        var regex = /^[a-zA-Z0-9 ]*$/;
        if (regex.test(name) === false) {
            printError("Please enter a valid test name");
        }
        else {
            nameErr = false;
        }
    }

    // valid test duration
    if(duration == "") {
        printError("Please enter test duration");
    }
    else {
        var regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
        if(regex.test(duration) === false) {
            printError("Please enter duration in following format: HH:MM:SS")
        }
        else {
            durationErr = false;
        }
    }

    if ((nameErr || durationErr) == true) {
        return false;
    }
    else {
        createTest()
    }
}

function printError(msg) {
    let p = document.createElement("p")
    p.innerText = msg
    document.getElementById("error").classList.add("alert", "alert-danger")
    document.getElementById("error").appendChild(p)
}
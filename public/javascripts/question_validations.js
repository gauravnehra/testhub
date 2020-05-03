function validate() {
    let qType = document.getElementById('question-type').value
    if (qType == 'MCQ') {
        let question = document.getElementById('question').value
        let optionA = document.getElementById('optionA').value
        let optionB = document.getElementById('optionB').value
        let optionC = document.getElementById('optionC').value
        let optionD = document.getElementById('optionD').value
        let score = document.getElementById('score').value
        let questionErr = optionErr = scoreErr = true

        // valid question
        if (question == "") {
            printError("Please enter question");
            return
        }
        else {
            questionErr = false;
        }

        // valid options
        if (optionA == "" || optionB == "" || optionC == "" || optionD == "") {
            printError("Please enter all options");
            return
        }
        else {
            optionErr = false;
        }

        // valid score
        if (score < 1) {
            printError("Please enter valid score")
        }
        else {
            scoreErr = false
        }

        if ((questionErr || optionErr || scoreErr) == true) {
            return false;
        }
        else {
            addQuestion()
        }
    }
    else if (qType == 'notMCQ') {
        let question = document.getElementById('question').value
        let questionErr = true

        // valid question
        if (question == "") {
            printError("Please enter question");
            return
        }
        else {
            questionErr = false;
        }

        if ((questionErr) == true) {
            return false;
        }
        else {
            addQuestion()
        }
    }
}

function printError(msg) {
    document.getElementById('error').innerText = msg
}

function validateEdit() {
    let qType = document.getElementById('question-type').value
    if (qType == 'MCQ') {
        let question = document.getElementById('question').value
        let optionA = document.getElementById('optionA').value
        let optionB = document.getElementById('optionB').value
        let optionC = document.getElementById('optionC').value
        let optionD = document.getElementById('optionD').value
        let score = document.getElementById('score').value
        let questionErr = optionErr = scoreErr = true

        // valid question
        if (question == "") {
            printError("Please enter question");
        }
        else {
            questionErr = false;
        }

        // valid options
        if (optionA == "" || optionB == "" || optionC == "" || optionD == "") {
            printError("Please enter all options");
        }
        else {
            optionErr = false;
        }

        // valid score
        if(score < 1) {
            printError("Please enter valid score")
        }
        else {
            scoreErr = false
        }

        if ((questionErr || optionErr || scoreErr) == true) {
            return false;
        }
        else {
            editQuestion()
        }
    }
    else if(qType == 'notMCQ') {
        let question = document.getElementById('question').value
        let questionErr = true

        // valid question
        if (question == "") {
            printError("Please enter question");
        }
        else {
            questionErr = false;
        }
        
        if ((questionErr) == true) {
            return false;
        }
        else {
            editQuestion()
        }
    }
}
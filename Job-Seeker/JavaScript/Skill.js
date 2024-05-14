const skillOne = document.querySelector("#skillOne");
const skillTwo = document.querySelector("#skillTwo");
const skillThree = document.querySelector("#skillThree");

function validatSkillOne(){
    const skill1 = skillOne.value.trim();
    const skill1Regex = /^[A-Za-z, ]+$/;

    if (skill1 === "") {
        displayErrorMessage(skillOne, "Required");
    }
    else if (!skill1Regex.test(skill1)) {
        displayErrorMessage(skillOne, "Invalid characters. Please enter only letters and commas.");
    }
    else {
        removeErrorMessage(skillOne);
    }
}

function validatSkillTwo(){
    const skill2 = skillTwo.value.trim();
    const skill2Regex = /^[A-Za-z, ]+$/;

    if (skill2 === "") {
        displayErrorMessage(skillTwo, "Required");
    } else if (!skill2Regex.test(skill2)) {
        displayErrorMessage(skillTwo, "Invalid characters. Please enter only letters and commas.");
    } else {
        removeErrorMessage(skillTwo);
    }
}

function validatSkillThree(){
    const skill3 = skillThree.value.trim();
    const skill3Regex = /^[A-Za-z, ]+$/;

    if (skill3 === "") {
        displayErrorMessage(skillThree, "Required");
    }
    else if (!skill3Regex.test(skill3)) {
        displayErrorMessage(skillThree, "Invalid characters. Please enter only letters and commas.");
    }
    else {
        removeErrorMessage(skillThree);
    }
}


skillOne.addEventListener('blur', validatSkillOne);
skillTwo.addEventListener('blur', validatSkillTwo);
skillThree.addEventListener('blur', validatSkillThree);

// Function for error display
function displayErrorMessage(input, message){
    const errorElement = document.querySelector('#' + input.id + '-error');
    errorElement.textContent = message;
}

function removeErrorMessage(input){
    const errorElement = document.querySelector('#' + input.id + '-error');
    errorElement.textContent = "";
}

// If no error message, form is valid
function isFormValid(){
    const errorMessages = document.querySelectorAll('.error-message');
    for(let i = 0; i < errorMessages.length; i++){
        if (errorMessages[i].textContent !== ""){
            return false;
        }
    }
    return true;
}

// Function form validation
function validateForm(){
    validatSkillOne();
    validatSkillTwo();
    validatSkillThree();

    return isFormValid();
}

SkillsForm = document.querySelector('.form');
SkillsForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Skill-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);
                    
                    // Redirect user
                    setTimeout(function() {
                        window.location.href = "http://localhost/STAPH/Job-Seeker/Profile/Expectation.html";
                        // Clear form fields
                        clearFormFields();
                    }, 2000); // 2000 milliseconds = 2 seconds

                } else {
                    // Error reponse
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(SkillsForm);
        request.send(formData);
        // Error Handling
        request.onerror = function(){
            console.log("Error: XMLHttpRequest failed");
        };
    }
});

function clearFormFields() {
    document.querySelector('.form').reset();
}

function errorMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Error !</strong> ' + message;
    alertDiv.classList.remove("alert-success");
    alertDiv.classList.add("alert-danger");
    alertDiv.style.display = "block";
}

function successMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Success !</strong> ' + message;
    alertDiv.classList.remove("alert-danger");
    alertDiv.classList.add("alert-success");
    alertDiv.style.display = "block";

    // Set a timeout to hide after success Registration 
    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 2000);
}



// Client side form Validation
const EmployerLoginForm = document.querySelector(".form");

// Validate input feilds
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Event listeners for input fields
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);

// Validate email 
function validateEmail(){
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailValue === ""){
        displayErrorMessage(emailInput, "Field is required");
    } else if(!emailRegex.test(emailValue)){
        displayErrorMessage(emailInput, "Invalid Email. Please enter a valid email.");
    } else {
        removeErrorMessage(emailInput);
    }
}

// Validate password 
function validatePassword(){
    const passwordValue = passwordInput.value.trim();

    if(passwordValue === ""){
        displayErrorMessage(passwordInput, "Field is required");
    } else if(passwordValue.length < 8){
        displayErrorMessage(passwordInput, "Password must be at least 8 characters long.");
    } else {
        removeErrorMessage(passwordInput);
    }
}

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
    validateEmail();
    validatePassword();

    return isFormValid();
}

EmployerLoginForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission
        console.log("form is valid");

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Login-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.member) { // if Complete profile true
                   
                    successMessage(response.message);
                    window.location.href = "http://localhost/STAPH/Job-Provider/Profile/Employer-Dashboard.html";
                    clearFormFields();

                } else if (response.success){
                    
                    successMessage(response.message);
                    window.location.href = "http://localhost/STAPH/Job-Provider/Profile/About.html";
                    clearFormFields();
                    
                }else {
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(EmployerLoginForm);
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

    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}

function successMessage(message){
    var alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = '<strong>Success !</strong> ' + message;
    alertDiv.classList.remove("alert-danger");
    alertDiv.classList.add("alert-success");
    alertDiv.style.display = "block";

    // Set a timeout to hide after success Login 
    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}



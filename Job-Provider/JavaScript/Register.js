// Client side form Validation
const EmployerRegisterForm = document.querySelector(".form");

// Validate input fields
const companyName = document.querySelector('#name');
const companyPhone = document.querySelector('#Phone');
const companyEmail = document.querySelector('#email');
const companyPassword = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm');

// Event listeners for input fields
companyName.addEventListener('blur', validateCompanyName);
companyPhone.addEventListener('blur', validateCompanyPhone);
companyEmail.addEventListener('blur', validateCompanyEmail);
companyPassword.addEventListener('blur', validateCompanyPassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);


function validateCompanyName(){
    const companyNameValue = companyName.value.trim();
    const companyNameRegex = /^[A-Za-z]+$/;

    if(companyNameValue === ""){
        displayErrorMessage(companyName, "Field is required");
    } else if(!companyNameRegex.test(companyNameValue)){
        displayErrorMessage(companyName, "Invalid Name. Please enter only letters.");
    } else {
        removeErrorMessage(companyName);
    }
}

function validateCompanyPhone(){
    const companyPhoneValue = companyPhone.value.trim();
    const companyPhoneRegex = /^\d{10}$/;

    if(companyPhoneValue === ""){
        displayErrorMessage(companyPhone, "Field is required");
    } else if(!companyPhoneRegex.test(companyPhoneValue)){
        displayErrorMessage(companyPhone, "Invalid Number. Please enter a valid number.");
    } else {
        removeErrorMessage(companyPhone);
    }
}

// Validate email 
function validateCompanyEmail(){
    const companyEmailValue = companyEmail.value.trim();
    const companyEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(companyEmailValue === ""){
        displayErrorMessage(companyEmail, "Field is required");
    } else if(!companyEmailRegex.test(companyEmailValue)){
        displayErrorMessage(companyEmail, "Invalid Email. Please enter a valid email.");
    } else {
        removeErrorMessage(companyEmail);
    }
}

// Validate password 
function validateCompanyPassword(){
    const companyPasswordValue = companyPassword.value.trim();

    if(companyPasswordValue === ""){
        displayErrorMessage(companyPassword, "Field is required");
    } else if(companyPasswordValue.length < 8){
        displayErrorMessage(companyPassword, "Password must be at least 8 characters long.");
    } else {
        removeErrorMessage(companyPassword);
    }
}

function validateConfirmPassword(){
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    const companyPasswordValue = companyPassword.value.trim();

    if(confirmPasswordValue === ""){
        displayErrorMessage(confirmPasswordInput, "Field is required");
    } else if(confirmPasswordValue !== companyPasswordValue){
        displayErrorMessage(confirmPasswordInput, "Passwords do not match");
    } else {
        removeErrorMessage(confirmPasswordInput);
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
    validateCompanyName();
    validateCompanyPhone();
    validateCompanyEmail();
    validateCompanyPassword();
    validateConfirmPassword();
    return isFormValid();
}

EmployerRegisterForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        console.log("form is invalid");
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission
        console.log("form is valid");

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Register-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // if Complete profile true
                   
                    successMessage(response.message);
                    window.location.href = "http://localhost/STAPH/Job-Provider/Login.html";
                    clearFormFields();
          
                } else {
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(EmployerRegisterForm);
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

    // Set a timeout to hide after success Login 
    setTimeout(function() {
        alertDiv.style.display = "none";
    }, 1000);
}


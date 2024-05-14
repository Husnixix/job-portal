// Client side form validation
const candidateRegisterForm = document.querySelector('.form');

// Validate input fields
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const phoneNumberInput = document.querySelector('#phone-number');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm');

// Event listeners for input fields
firstNameInput.addEventListener('blur', validateFirstName);
lastNameInput.addEventListener('blur', validateLastName);
phoneNumberInput.addEventListener('blur', validatePhoneNumber);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur',validateConfirmPassword);

// Validate first name
function validateFirstName(){
    const firstNameValue = firstNameInput.value.trim();
    const firstNameRegex = /^[A-Za-z]+$/;

    if(firstNameValue === ""){
        displayErrorMessage(firstNameInput, "Field is required");
    } else if(!firstNameRegex.test(firstNameValue)){
        displayErrorMessage(firstNameInput, "Invalid Name. Please enter only letters.");
    } else {
        removeErrorMessage(firstNameInput);
    }
}

// Validate last name
function validateLastName(){
    const lastNameValue = lastNameInput.value.trim();
    const lastNameRegex = /^[A-Za-z]+$/;

    if(lastNameValue === ""){
        displayErrorMessage(lastNameInput, "Field is required");
    } else if(!lastNameRegex.test(lastNameValue)){
        displayErrorMessage(lastNameInput, "Invalid Name. Please enter only letters.");
    } else {
        removeErrorMessage(lastNameInput);
    }
}

// Validate phone number 
function validatePhoneNumber(){
    const phoneNumberValue = phoneNumberInput.value.trim();
    const phoneNumberRegex = /^\d{10}$/;

    if(phoneNumberValue === ""){
        displayErrorMessage(phoneNumberInput, "Field is required");
    } else if(!phoneNumberRegex.test(phoneNumberValue)){
        displayErrorMessage(phoneNumberInput, "Invalid Number. Please enter a valid number.");
    } else {
        removeErrorMessage(phoneNumberInput);
    }
}

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

function validateConfirmPassword(){
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    const passwordValue = passwordInput.value.trim(); 

    if(confirmPasswordValue === ""){
        displayErrorMessage(confirmPasswordInput, "Field is required");
    } else if(confirmPasswordValue !== passwordValue){
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
    validateFirstName();
    validateLastName();
    validatePhoneNumber();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    return isFormValid();
}



candidateRegisterForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Register-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);
                    
                    // Redirect user
                    setTimeout(function() {
                        window.location.href = "http://localhost/STAPH/Job-Seeker/Login.html";
                        // Clear form fields
                        clearFormFields();
                    }, 1000); // 2000 milliseconds = 2 seconds

                } else {
                    // Error reponse
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(candidateRegisterForm);
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
    }, 1000);
}


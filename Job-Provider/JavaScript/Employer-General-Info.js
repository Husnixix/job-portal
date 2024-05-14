function validatePhoneNumber(){
    const phoneNumberInput = document.getElementById("Phone");
    const phoneNumberValue = phoneNumberInput.value.trim();
    const phoneNumberRegex = /^\d{10}$/;

    if(phoneNumberValue === ""){
        displayErrorMessage(phoneNumberInput, "Required");
    } else if(!phoneNumberRegex.test(phoneNumberValue)){
        displayErrorMessage(phoneNumberInput, "Invalid Number. Please enter a valid number.");
    } else {
        removeErrorMessage(phoneNumberInput);
    }
}

function validateLocation(){
    const addressInput = document.getElementById("location");
    const address = addressInput.value.trim();
    const addressRegex = /^[A-Za-z, ]+$/;

    if(address === ""){
        displayErrorMessage(addressInput, "Required");
    }
    else if(!addressRegex.test(address)){
        displayErrorMessage(addressInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(addressInput);
    }
}

function validateBio(){
    const aboutMeInput = document.getElementById("bio");
    const aboutMe = aboutMeInput.value.trim();
    const aboutMeRegex =  /^[A-Za-z, ]+$/; 

    if(aboutMe === ""){
        displayErrorMessage(aboutMeInput, "Required.");
    }
    else if(!aboutMeRegex.test(aboutMe)){
        displayErrorMessage(aboutMeInput, "Invalid characters. Please enter only letters and commas.");
    }
    else{
        removeErrorMessage(aboutMeInput);
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
    validatePhoneNumber();
    validateLocation();
    validateBio();

    return isFormValid();
}

const GeneralInformation = document.querySelector('.GeneralInformation');
GeneralInformation.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Employer-General-Info.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);

                    clearFormFields();
                    window.location.href = "http://localhost/STAPH/Job-Provider/Profile/Employer-Profile.html";

                } else {
                    // Error reponse
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(GeneralInformation);
        request.send(formData);
        // Error Handling
        request.onerror = function(){
            console.log("Error: XMLHttpRequest failed");
        };
    }
});

function clearFormFields() {
    document.querySelector('.GeneralInformation').reset();
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
 
}


const resumeInput = document.querySelector('#resume');
const addressInput = document.querySelector('#address');
const currentRoleInput = document.querySelector('#currentRole');
const rolesOpenToInput = document.querySelector('#rolesOpenTo');
const aboutMeInput = document.querySelector('#aboutMe');

function validateResume() {
    var file = resumeInput.files[0];

    if(file === null || file === undefined){
        displayErrorMessage(resumeInput, "Required");
    } 
    else{
        var fileSize = file.size;
        var maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if(fileSize > maxSize){
            displayErrorMessage(resumeInput, "File size must be less than 5mb");
            resumeInput.value = '';
        }
        else if(file.type !== "application/pdf"){
            displayErrorMessage(resumeInput, "File type not supported, Please upload a PDF file");
            resumeInput.value = '';
        }else{
            removeErrorMessage(resumeInput);
        }
    }
}

function validateAddress() {
    const address = addressInput.value.trim();
    const addressRegex = /^[A-Za-z, ]+$/;

    if(address === ""){
        displayErrorMessage(addressInput, "Field is required");
    }
    else if(!addressRegex.test(address)){
        displayErrorMessage(addressInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(addressInput);
    }
}


function validateCurrentRole() {
    const currentRole = currentRoleInput.value.trim();
    const currentRoleRegex = /^[A-Za-z, ]+$/;

    if(currentRole === ""){
        displayErrorMessage(currentRoleInput, "Required");
    }
    else if(!currentRoleRegex.test(currentRole)){
        displayErrorMessage(currentRoleInput, "Invalid characters. Please enter only letters and commas.");
    }
    else{
        removeErrorMessage(currentRoleInput);
    }
}

function validateRolesOpenTo() {
    const rolesOpenTo = rolesOpenToInput.value.trim();
    const rolesOpenToRegex = /^[A-Za-z, ]+$/;

    if (rolesOpenTo === "") {
        displayErrorMessage(rolesOpenToInput, "Required");
    }else if(!rolesOpenToRegex.test(rolesOpenTo)){
        displayErrorMessage(rolesOpenToInput, "Invalid characters. Please enter only letters and commas.");
    }else{
        removeErrorMessage(rolesOpenToInput);
    }
}

function validateAboutMe() {
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

resumeInput.addEventListener('blur', validateResume);
addressInput.addEventListener('blur', validateAddress);
currentRoleInput.addEventListener('blur', validateCurrentRole);
rolesOpenToInput.addEventListener('blur', validateRolesOpenTo);
aboutMeInput.addEventListener('blur', validateAboutMe);


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
    validateResume();
    validateAddress();
    validateCurrentRole();
    validateRolesOpenTo();
    validateAboutMe();

    return isFormValid();
}

AboutMeForm = document.querySelector('.form');
AboutMeForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/About-Me-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);
                    
                    // Redirect user
                    setTimeout(function() {
                        window.location.href = "http://localhost/STAPH/Job-Seeker/Profile/Skill.html";
                        
                        clearFormFields();
                    }, 2000); 

                } else {
                    // Error reponse
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(AboutMeForm);
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



// Client side form Validation
const JobPostForm = document.querySelector(".form");

// Validate input fields
const JobTitleInput = document.querySelector('#jobTitle');
const LocationInput = document.querySelector('#location');
const RequirementsInput = document.querySelector('#Requirements');
const ResponsibilitesInput = document.querySelector('#Responsibilities');

// Event listeners for input fields
JobTitleInput.addEventListener('blur', validateJobTitle);
LocationInput.addEventListener('blur', validateLocation);
RequirementsInput.addEventListener('blur', validateRequirements);
ResponsibilitesInput.addEventListener('blur', validateResponsibilites);

// Validate email 
function validateJobTitle(){
    const jobTitle = JobTitleInput.value.trim();
    const jobTitleRegex = /^[A-Za-z, ]+$/;

    if(jobTitle === ""){
        displayErrorMessage(JobTitleInput, "Required");
    }
    else if(!jobTitleRegex.test(jobTitle)){
        displayErrorMessage(JobTitleInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(JobTitleInput);
    }
}

function validateLocation(){
    const Location = LocationInput.value.trim();
    const LocationRegex = /^[A-Za-z, ]+$/;

    if(Location === ""){
        displayErrorMessage(LocationInput, "Required");
    }
    else if(!LocationRegex.test(Location)){
        displayErrorMessage(LocationInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(LocationInput);
    }
}

function validateRequirements(){
    const requirements = RequirementsInput.value.trim();
    const requirementsRegex = /^[A-Za-z0-9., ]+$/;

    if(requirements === ""){
        displayErrorMessage(RequirementsInput, "Required");
    }
    else if(!requirementsRegex.test(requirements)){
        displayErrorMessage(RequirementsInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(RequirementsInput);
    }
}

// Validate password 
function validateResponsibilites(){
    const responsibilities = ResponsibilitesInput.value.trim();
    const responsibilitiesRegex = /^[A-Za-z0-9., ]+$/

    if(responsibilities === ""){
        displayErrorMessage(ResponsibilitesInput, "Required");
    }
    else if(!responsibilitiesRegex.test(responsibilities)){
        displayErrorMessage(ResponsibilitesInput, "Invalid characters. Please enter a valid title.");
    } 
    else{
        removeErrorMessage(ResponsibilitesInput);
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
    validateJobTitle();
    validateLocation();
    validateRequirements();
    validateResponsibilites();

    return isFormValid();
}

JobPostForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission
        console.log("form is valid");

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Provider/PHP/Job-Post-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // if Complete profile true
                   
                    successMessage(response.message);
                    window.location.href = "http://localhost/STAPH/Job-Provider/Profile/Employer-Dashboard.html";
                    clearFormFields();
                    
                } else {
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(JobPostForm);
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


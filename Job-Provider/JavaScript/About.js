const ImageInput = document.querySelector('#logo');
const LocationInput = document.querySelector('#address');
const BioInput = document.querySelector('#companyAbout');


ImageInput.addEventListener('blur', validateImage);
LocationInput.addEventListener('blur', validateLocation);
BioInput.addEventListener('blur', validateBio);

function validateImage() {
    var file = ImageInput.files[0];

    if(file === null || file === undefined){
        displayErrorMessage(ImageInput, "Required");
    } 
    else{
        var fileSize = file.size;
        var maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if(fileSize > maxSize){
            displayErrorMessage(ImageInput, "File size must be less than 5mb");
            ImageInput.value = '';
        }
        else if(!file.type.match('image/png') && !file.type.match('image/jpeg')){
            displayErrorMessage(ImageInput, "File type not supported, Please upload a PNG/JPEG format");
            ImageInput.value = '';
        }else{
            removeErrorMessage(ImageInput);
        }
    }
}

function validateLocation() {
    const address = LocationInput.value.trim();
    const addressRegex = /^[A-Za-z, ]+$/;

    if(address === ""){
        displayErrorMessage(LocationInput, "Field is required");
    }
    else if(!addressRegex.test(address)){
        displayErrorMessage(LocationInput, "Invalid characters. Please enter only letters and commas.");
    } 
    else{
        removeErrorMessage(LocationInput);
    }
}


function validateBio() {
    const about = BioInput.value.trim();
    const aboutRegex =  /^[A-Za-z, ]+$/; 

    if(about === ""){
        displayErrorMessage(BioInput, "Required.");
    }
    else if(!aboutRegex.test(about)){
        displayErrorMessage(BioInput, "Invalid characters. Please enter only letters and commas.");
    }
    else{
        removeErrorMessage(BioInput);
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
    validateImage();
    validateLocation();
    validateBio();

    return isFormValid();
}

AboutForm = document.querySelector('.form');
AboutForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Provider/PHP/About-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);
                    clearFormFields();
                    window.location.href = "http://localhost/STAPH/Job-Provider/Profile/Employer-Dashboard.html";
    

                } else {
                    // Error reponse
                    errorMessage(response.message);
                }
            } else {
                console.log("Error: " + request.status);
            }
        };

        var formData = new FormData(AboutForm);
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



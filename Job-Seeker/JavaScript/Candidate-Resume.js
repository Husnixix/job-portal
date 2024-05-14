const UserResume = document.getElementById('UserResume');

function ValidateUserResume() {
    var file = UserResume.files[0];

    if(file === null || file === undefined){
        displayErrorMessage(UserResume, "Required");
    } 
    else{
        var fileSize = file.size;
        var maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if(fileSize > maxSize){
            displayErrorMessage(UserResume, "File size must be less than 5mb");
            UserResume.value = '';
        }
        else if(file.type !== "application/pdf"){
            displayErrorMessage(UserResume, "File type not supported, Please upload a PDF file");
            UserResume.value = '';
        }else{
            removeErrorMessage(UserResume);
        }
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


UserResume.addEventListener('blur', ValidateUserResume);

// Function form validation
function validateForm(){
    ValidateUserResume();

    return isFormValid();
}

const UserResumeForm = document.querySelector(".UserResumeForm");
UserResumeForm.addEventListener("submit", function(event){
    if(validateForm){
        event.preventDefault();
        console.log("form submisson");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Candidate-Resume.php", true);
        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 400){
                var response = JSON.parse(xhr.responseText);
                if(response.success){
                    successMessage(response.message);
                    console.log(response.message);
                    window.location.href = "http://localhost/STAPH/Job-Seeker/Profile/Candidate-Profile.html";                    
                    clearFormFields();
                }else{
                    errorMessage(response.message);
                }
            }else{
                console.log("Error: " + request.status);
            }
        }

    }
    
    var formData = new FormData(UserResumeForm);
    xhr.send(formData);
    // Error Handling
    xhr.onerror = function(){
        console.log("Error: XMLHttpRequest failed");
    };
});


function clearFormFields() {
    document.querySelector('.Resume').reset();
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
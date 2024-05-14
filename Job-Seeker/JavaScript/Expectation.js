const inOffice = document.getElementById('inOffice');
const flexible = document.getElementById('flexible');
const remoteOnly = document.getElementById('remoteOnly');
const isEmployedYes = document.getElementById('yes');
const isEmployedNo = document.getElementById('no');
const activeLooking = document.getElementById('activeLooking');
const casualBrowsing = document.getElementById('casualBrowsing');
const joiningPeriod = document.getElementById('joiningPeriod');
const salary = document.getElementById('salary');
const Currency = document.getElementById('currency');
const paidEvery = document.getElementById('paidEvery');

inOffice.addEventListener('blur', validateWorkPreference);
flexible.addEventListener('blur', validateWorkPreference);
remoteOnly.addEventListener('blur', validateWorkPreference);
isEmployedYes.addEventListener('blur', validateCurrentlyEmployed);
isEmployedNo.addEventListener('blur', validateCurrentlyEmployed);
activeLooking.addEventListener('blur', validateEmploymentStatus);
casualBrowsing.addEventListener('blur', validateEmploymentStatus);
salary.addEventListener('blur', validateSalary);


function validateWorkPreference(){

    if(!inOffice.checked && !flexible.checked && !remoteOnly.checked){
        displayErrorMessage(inOffice, "Required");
    }
    else{
        removeErrorMessage(inOffice);
    }
}

function validateCurrentlyEmployed(){

    if(!isEmployedYes.checked && !isEmployedNo.checked){
        displayErrorMessage(isEmployedYes, "Required");
    }
    else{
        removeErrorMessage(isEmployedYes);
    }
}

function validateEmploymentStatus(){

    if(!activeLooking.checked && !casualBrowsing.checked){
        displayErrorMessage(activeLooking, "Required");
    }
    else{
        removeErrorMessage(activeLooking);
    }
}

function validateSalary(){

    const salaryInput = salary.value.trim();
    const salaryRegex = /^\d+$/;

    if (salaryInput === "") {
        displayErrorMessage(salary, "Required");
    } else if (!salaryRegex.test(salaryInput)) {
        displayErrorMessage(salary, "Invalid");
    } else {
        removeErrorMessage(salary);
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
    validateWorkPreference();
    validateCurrentlyEmployed();
    validateEmploymentStatus();
    validateSalary();

    return isFormValid();
}

ExpectationForm = document.querySelector('.form');
ExpectationForm.addEventListener('submit', function(event){
    if (!validateForm()){
        event.preventDefault(); // Prevent form submission if validation fails
        
    }else{
        // Server side  validation
        event.preventDefault();// Prevent form submission

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Expectation-Process.php", true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                if (response.success) { // Success Reponse
                    successMessage(response.message);
                    
                    //Redirect user
                    setTimeout(function() {
                        window.location.href = "http://localhost/STAPH/Job-Seeker/Profile/Customer-Dashboard.html";
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

        var formData = new FormData(ExpectationForm);
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



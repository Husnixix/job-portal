const SalaryExpectation = document.querySelector(".SalaryExpectation");
SalaryExpectation.addEventListener('submit', function(event){
    event.preventDefault();
    
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Candidate-Salary.php");
    request.onload = function(){
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) { // Success Reponse
                successMessage(response.message);
                console.log(response.message);
                window.location.href = "http://localhost/STAPH/Job-Seeker/Profile/Candidate-Profile.html";                    
                clearFormFields();

            } else {
                // Error reponse
                errorMessage(response.message);
            }
        } else {
            console.log("Error: " + request.status);
        }
    }
    var formData = new FormData(SalaryExpectation);
    request.send(formData);
    // Error Handling
    request.onerror = function(){
        console.log("Error: XMLHttpRequest failed");
    };
});

function clearFormFields() {
    document.querySelector('.SalaryExpectation').reset();
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
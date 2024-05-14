const skillOne = document.getElementById("skOne");
const skillTwo = document.getElementById("skTwo");
const skillThree = document.getElementById("skThree");

function validateSkillOne(){
    const skill1 = skillOne.value.trim();
    const skill1Regex = /^[A-Za-z, ]+$/;

    if (skill1 === "") {
        displayErrorMessage(skillOne, "Required");
    }
    else if (!skill1Regex.test(skill1)) {
        displayErrorMessage(skillOne, "Invalid characters. Please enter only letters and commas.");
    }
    else {
        removeErrorMessage(skillOne);
    }
}

function validateSkillTwo(){
    const skill2 = skillTwo.value.trim();
    const skill2Regex = /^[A-Za-z, ]+$/;

    if (skill2 === "") {
        displayErrorMessage(skillTwo, "Required");
    } else if (!skill2Regex.test(skill2)) {
        displayErrorMessage(skillTwo, "Invalid characters. Please enter only letters and commas.");
    } else {
        removeErrorMessage(skillTwo);
    }
}

function validateSkillThree(){
    const skill3 = skillThree.value.trim();
    const skill3Regex = /^[A-Za-z, ]+$/;

    if (skill3 === "") {
        displayErrorMessage(skillThree, "Required");
    }
    else if (!skill3Regex.test(skill3)) {
        displayErrorMessage(skillThree, "Invalid characters. Please enter only letters and commas.");
    }
    else {
        removeErrorMessage(skillThree);
    }
}

function displayErrorMessage(input, message){
    const errorElement = document.querySelector('#' + input.id + '-error');
    errorElement.textContent = message;
}

function removeErrorMessage(input){
    const errorElement = document.querySelector('#' + input.id + '-error');
    errorElement.textContent = "";
}

function isFormValid(){
    const errorMessages = document.querySelectorAll('.error-message');
    for(let i = 0; i < errorMessages.length; i++){
        if (errorMessages[i].textContent !== ""){
            return false;
        }
    }
    return true;
}

function validateForm(){
    validateSkillOne();
    validateSkillTwo();
    validateSkillThree();

    return isFormValid();
}


skillOne.addEventListener("blur", validateSkillOne);
skillTwo.addEventListener("blur", validateSkillTwo);
skillThree.addEventListener("blur", validateSkillThree);

const Skills = document.querySelector('.SkillInformation');
Skills.addEventListener('submit', function(event){
    
    if(!validateForm){

        event.preventDefault();
        
        }else{
                
            var request = new XMLHttpRequest();
            request.open("POST", "http://localhost/STAPH/Job-Seeker/PHP/Candidate-Skill.php", true);
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
            };

            var formData = new FormData(Skills);
            request.send(formData);

            // Error Handling
            request.onerror = function(){
                console.log("Error: XMLHttpRequest failed");
            };
        }
        
    
});

function clearFormFields() {
    document.querySelector('.SkillInformation').reset(); // Use ID selector instead of class
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

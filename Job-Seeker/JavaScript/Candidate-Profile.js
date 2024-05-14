document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://localhost/STAPH/Job-Seeker/PHP/Candidate-Profile-Process.php");
    request.onload = function(){
        var data = JSON.parse(request.responseText);
        // Update the DOM with the fetched data
        console.log(data);
        updateGeneralInformation(data);
        updateSkills(data);
        updateJobPreference(data);
        openPdfButton(data);
        displayGeneralInformation(data);
        displaySkillInformation(data);
        displayJobPreference(data);
        displaySalaryExpectation(data);
        
    }
    
    request.send(); // Send the request

    // Error Handling
    request.onerror = function(){
        console.log("Error: XMLHttpRequest failed");
    };
}

function updateGeneralInformation(data) {
    var resumePath = data.GeneralInformation.resume;
    var fileName = resumePath.substring(resumePath.lastIndexOf('/') + 1);

    // Extract the first letter of the name and capitalize it
    var firstNameLetter = data.GeneralInformation.name.charAt(0).toUpperCase();

    // Set the first letter of the name as the text content of the navbar brand
    document.querySelector('.navbar-brand').innerText = firstNameLetter;

    document.getElementById('resume').innerText = fileName;
    document.getElementById('emailValue').innerText = data.GeneralInformation.email;
    document.getElementById('nameValue').innerText = data.GeneralInformation.name;
    document.getElementById('phoneValue').innerText = data.GeneralInformation.phone;
    document.getElementById('locationValue').innerText = data.GeneralInformation.location;
    document.getElementById('primaryRoleValue').innerText = data.GeneralInformation.primaryRole;
    document.getElementById('rolesOpenToValue').innerText = data.GeneralInformation.rolesOpenTo;
    document.getElementById('bioValue').innerText = data.GeneralInformation.bio;

}

function updateSkills(data) {

    document.getElementById('skillOne').innerText = data.SkillInformation.skillOne;
    document.getElementById('skillExperienceOne').innerText = data.SkillInformation.skillExperienceOne;
    document.getElementById('skillTwo').innerText = data.SkillInformation.skillTwo;
    document.getElementById('skillExperienceTwo').innerText = data.SkillInformation.skillExperienceTwo;
    document.getElementById('skillThree').innerText = data.SkillInformation.skillThree;
    document.getElementById('skillExperienceThree').innerText = data.SkillInformation.skillExperienceThree;

}

function updateJobPreference(data) {

    document.getElementById('workStyle').innerText = data.JobPreferenceInformation.workStyle;
    document.getElementById('isEmployed').innerText = data.JobPreferenceInformation.isEmployed;
    document.getElementById('jobSearchStatus').innerText = data.JobPreferenceInformation.jobSearchStatus;
    document.getElementById('noticePeriod').innerText = data.JobPreferenceInformation.noticePeriod;
    document.getElementById('salary').innerText = data.JobPreferenceInformation.expectedSalary;
    document.getElementById('payment').innerText = data.JobPreferenceInformation.paymentFrequency;

}

function openPdfButton(data) {
    var resumePath = data.GeneralInformation.resume;
    var fileName = resumePath.substring(resumePath.lastIndexOf('/') + 1);
    
    document.getElementById('viewPdfButton').addEventListener('click', function() {
        var pdfUrl = "http://localhost/STAPH/Job-Seeker/Profile/Resume/" + fileName; // URL to the PDF file
        window.open(pdfUrl, '_blank'); // Open PDF in a new window
    });
}


function displayGeneralInformation(data){

    document.getElementById('Phone').value = data.GeneralInformation.phone;
    document.getElementById('location').value = data.GeneralInformation.location;
    document.getElementById('primaryRole').value = data.GeneralInformation.primaryRole;
    document.getElementById('rolesOpenTo').value = data.GeneralInformation.rolesOpenTo;
    document.getElementById('bio').value = data.GeneralInformation.bio;
}

function displaySkillInformation(data){

    document.getElementById('skOne').value = data.SkillInformation.skillOne;
    document.getElementById('skExpOne').value = data.SkillInformation.skillExperienceOne;
    document.getElementById('skTwo').value = data.SkillInformation.skillTwo;
    document.getElementById('skExpTwo').value = data.SkillInformation.skillExperienceTwo;
    document.getElementById('skThree').value = data.SkillInformation.skillThree;
    document.getElementById('skExpThree').value = data.SkillInformation.skillExperienceThree;

}

function displayJobPreference(data){
    
    document.getElementById('WorkStyle').value = data.JobPreferenceInformation.workStyle;
    document.getElementById('IsEmployed').value = data.JobPreferenceInformation.isEmployed;
    document.getElementById('JobSearch').value = data.JobPreferenceInformation.jobSearchStatus;
    document.getElementById('NoticePeriod').value = data.JobPreferenceInformation.noticePeriod;
}

function displaySalaryExpectation(data){
    
    document.getElementById('Salary').value = data.JobPreferenceInformation.expectedSalary;
    document.getElementById('PaidEvery').value = data.JobPreferenceInformation.paymentFrequency;
    
}
document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://localhost/STAPH/Job-Provider/PHP/Employer-Profile-Process.php");
    request.onload = function(){
        var data = JSON.parse(request.responseText);
        // Update the DOM with the fetched data
        console.log(data);
        updateGeneralInformation(data);
        displayGeneralInformation(data);
  
        
    }
    
    request.send(); // Send the request

    // Error Handling
    request.onerror = function(){
        console.log("Error: XMLHttpRequest failed");
    };
}

function updateGeneralInformation(data) {


    // Extract the first letter of the name and capitalize it
    var firstNameLetter = data.GeneralInformation.name.charAt(0).toUpperCase();

    // Set the first letter of the name as the text content of the navbar brand
    document.querySelector('.navbar-brand').innerText = firstNameLetter;
    document.getElementById('emailValue').innerText = data.GeneralInformation.email;
    document.getElementById('nameValue').innerText = data.GeneralInformation.name;
    document.getElementById('phoneValue').innerText = data.GeneralInformation.phone;
    document.getElementById('locationValue').innerText = data.GeneralInformation.location;
    document.getElementById('bioValue').innerText = data.GeneralInformation.bio;
    document.getElementById('organizationValue').innerText = data.GeneralInformation.organization;

}


function displayGeneralInformation(data){

    document.getElementById('Phone').value = data.GeneralInformation.phone;
    document.getElementById('location').value = data.GeneralInformation.location;
    document.getElementById('bio').value = data.GeneralInformation.bio;
}

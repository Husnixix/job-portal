var signOutButton = document.getElementById('signOut');

signOutButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Seeker/PHP/Sign-Out.php");
    request.onload = function (){
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if(response.success){
                console.log(response.message);
                alert(response.message); // Display an alert message
                window.location.href = "http://localhost/STAPH/Job-Seeker/Login.html";
            }else{
                console.log(response.message);
            }
           
        } else {
            console.log("Error: " + request.status);
        }
    };

    request.onerror = function() {
        console.error('Request failed');
    };
    request.send();
});

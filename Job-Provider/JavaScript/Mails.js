document.addEventListener('DOMContentLoaded', function() {
    fetchApplications();
});

function fetchApplications() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/STAPH/Job-Provider/PHP/Mails.php");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                var applications = response.data;
                renderApplications(applications);
            } else {
                console.error("Request failed with message:", response.message);
            }
        } else {
            console.error("Request failed with status:", request.status);
        }
    };

    request.onerror = function() {
        console.error("Request failed");
    };

    request.send();
}

function renderApplications(applications) {
    var container = document.querySelector('#messageContainer');
    var alertDiv = document.getElementById("alert");

    applications.forEach(function(application) {
        var row = document.createElement('div');
        row.classList.add('row', 'shadow', 'p-3', 'mt-3', 'g-2');

        var colLeft = document.createElement('div');
        colLeft.classList.add('col-12', 'col-sm-10');

        var jobInfo = document.createElement('strong');
        jobInfo.classList.add('mb-2');
        jobInfo.innerHTML = 'Message! <span class="ms-2 text-success">Unread</span>';
        var message = document.createElement('p'); 
        message.innerHTML = application.username + ' has requested to reschedule the interview for the position ' + application.jobTitle + ' Reference Id - ' + application.jobID;

        colLeft.appendChild(jobInfo);
        colLeft.appendChild(message);

        var colRight = document.createElement('div');
        colRight.classList.add('col-12', 'col-sm-2');

        var acceptButton = document.createElement('button');
        acceptButton.classList.add('btn', 'btn-success');
        acceptButton.innerHTML = 'Accept';
        acceptButton.addEventListener('click', function() {
            handleAccept(application.userID,  application.jobID,  application.eventID); // Pass event ID to handleAccept function
        });

        var rejectButton = document.createElement('button');
        rejectButton.classList.add('btn', 'btn-danger', 'ms-1');
        rejectButton.innerHTML = 'Reject';
        rejectButton.addEventListener('click', function() {
            handleReject(application.eventID); // Pass event ID to handleReject function
        });

        colRight.appendChild(acceptButton);
        colRight.appendChild(rejectButton);

        row.appendChild(colLeft);
        row.appendChild(colRight);

        container.appendChild(row);
    });
}

function handleAccept(userID, jobID, eventID) {
    // Handle accept action, you can perform an AJAX request here if needed
     // Display the calendar modal
    var modal = new bootstrap.Modal(document.getElementById('calender'));
    
    
    // // Set values for the fields in the modal
    document.getElementById('UserID').value = userID;
    document.getElementById('JobID').value = jobID;
    document.getElementById('EventID').value = eventID;

    // console.log('Accept clicked for event ID:', eventID);

    modal.show();
}

const updateInterviewForm = document.querySelector('.form');

updateInterviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted"); // Debugging statement to check if form submission is triggered

    // Get form data
    var formData = new FormData(this);
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); // Debugging statement to log form data
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/STAPH/Job-Provider/PHP/updateInterview.php", true);
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        var serverResponseElement = document.getElementById('serverResponse');
        if(response.success){
            serverResponseElement.textContent = response.message; 
            serverResponseElement.classList.add('text-success');
            console.log(this.responseText);
            serverResponseElement.style.display = 'block'; // Show the element
            clearFormFields();
            setTimeout(function() {
                serverResponseElement.style.display = 'none'; // Hide the element after 2 seconds
            }, 2000);
        }else{
            serverResponseElement.textContent = response.message;
            serverResponseElement.classList.remove('text-success');
            serverResponseElement.classList.add('text-danger');
            console.log(this.responseText);
            serverResponseElement.style.display = 'block'; // Show the element

            setTimeout(function() {
                serverResponseElement.style.display = 'none'; // Hide the element after 2 seconds
            }, 2000);
        }
    }
    xhr.send(formData);
});

function clearFormFields() {
    document.querySelector('.form').reset();
}

function handleReject(eventID) {
    // Handle reject action, you can perform an AJAX request here if needed
    console.log('Reject clicked for event ID:', eventID);
}


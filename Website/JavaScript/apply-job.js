document.addEventListener('click', function(event) {
    if (event.target.matches('.card-link.apply')) {
        event.preventDefault();
        console.log("Apply button clicked");

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if(response.success){
                        console.log(response);
                        window.location.href = `http://localhost/STAPH/Job-Seeker/Login.html`;
                    }else{
                        event.preventDefault();
                        console.log(response);
                    }
                } else {
                    console.error('Error fetching jobs: ' + xhr.status);
                }
            }
        };

        xhr.open('GET', 'http://localhost/STAPH/Website/PHP/Apply-Job.php', true);
        xhr.send();
    }
});


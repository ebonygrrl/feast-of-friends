const fileValidation = () => {
    var fileInput = document.getElementById('file');
        
    var filePath = fileInput.value;
    
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } else {        
        // Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(
                    'imagePreview').innerHTML =
                    '<img src="' + e.target.result
                    + '"/>';
            };
                
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#signup-fname').value.trim();
    const lastName = document.querySelector('#signup-lname').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const allergies = document.querySelectorAll('signup-allergies');
    let allergiesList = [];

    const getAllergies = () => {
      let checkboxValue;
      allergies.forEach((i) => {
        if (allergies[i].checked) {
          checkboxValue = allergies[i].value;
        } 
        allergiesList.push(checkboxValue);
      });
      console.log(allergiesList);
    }

    getAllergies();

    if (firstName && lastName && email && password) {
      console.log(JSON.stringify({ firstName, lastName, email, password }))
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
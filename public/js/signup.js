// const fileValidation = () => {
//     var fileInput = document.getElementById('file');
        
//     var filePath = fileInput.value;
    
//     // Allowing file type
//     var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        
//     if (!allowedExtensions.exec(filePath)) {
//         alert('Invalid file type');
//         fileInput.value = '';
//         return false;
//     } else {        
//         // Image preview
//         if (fileInput.files && fileInput.files[0]) {
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById(
//                     'imagePreview').innerHTML =
//                     '<img src="' + e.target.result
//                     + '"/>';
//             };
                
//             reader.readAsDataURL(fileInput.files[0]);
//         }
//     }
// };

const signupFormHandler = async (event) => {
  event.preventDefault();
  const firstName = document.querySelector('#signup-fname').value.trim();
  const lastName = document.querySelector('#signup-lname').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const fdish = document.querySelector('#signup-favdish').value.trim();
  const allergies = document.querySelector('.signup-allergies:checked').value;
  let allergiesList = [];
  let checkboxValue;
  for (let i=0; i < allergies.length; i++) {
    if (allergies[i].checked === true) {
      checkboxValue += allergies[i].value;
    }
    allergiesList.push(checkboxValue);
  }
  const allergy = allergiesList.toString();
  console.log(allergy);
  if (firstName && lastName && email && password) {
    const result = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password, allergy, fdish }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.ok) {
      document.location.replace('/api/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};
document
  .querySelector('#signUpBtn')
  .addEventListener('click', signupFormHandler);















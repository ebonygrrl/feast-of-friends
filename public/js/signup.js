const preview = document.querySelector('.preview');
const signupForm = document.querySelector('.signup-form');
const profileImg = document.querySelector('.avatar');

const updateImageDisplay = () => {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = profileImg.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const list = document.createElement('div');
    list.className = 'avatar-container'
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement('div');
      listItem.className = 'crop'
      const para = document.createElement('p');
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
};

//profileImg.addEventListener('change', updateImageDisplay, false);

const fileTypes = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

const signupFormHandler = async (event) => {
          
  event.preventDefault();

  const formData = new FormData(signupForm);

  //formData.set('avatar', profileImg.files[0]);

  const result = await fetch('/api/user/signup', {
    method: 'POST',
    body: formData,
    header: { 'Content-Type': 'multipart/form-data' }
  });

  if (result.ok) {
    console.log('200');
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up.');
  }

};

if(signupForm){
  signupForm.addEventListener('submit', signupFormHandler, false);
};




// const preview = document.querySelector('.preview');
// const profileImg = document.getElementById('avatar');

// const updateImageDisplay = () => {
//   while(preview.firstChild) {
//     preview.removeChild(preview.firstChild);
//   }

//   const curFiles = profileImg.files;
//   if (curFiles.length === 0) {
//     const para = document.createElement('p');
//     para.textContent = 'No files currently selected for upload';
//     preview.appendChild(para);
//   } else {
//     const list = document.createElement('div');
//     list.className = 'avatar-container'
//     preview.appendChild(list);

//     for (const file of curFiles) {
//       const listItem = document.createElement('div');
//       listItem.className = 'crop'
//       const para = document.createElement('p');
//       if (validFileType(file)) {
//         para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
//         const image = document.createElement('img');
//         image.src = URL.createObjectURL(file);

//         listItem.appendChild(image);
//         listItem.appendChild(para);
//       } else {
//         para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
//         listItem.appendChild(para);
//       }

//       list.appendChild(listItem);
//     }
//   }
// };

// if(profileImg){
// profileImg.addEventListener('change', updateImageDisplay);
// };

// const fileTypes = [
//   "image/gif",
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/svg+xml",
// ];

// function validFileType(file) {
//   return fileTypes.includes(file.type);
// }

// function returnFileSize(number) {
//   if (number < 1024) {
//     return `${number} bytes`;
//   } else if (number >= 1024 && number < 1048576) {
//     return `${(number / 1024).toFixed(1)} KB`;
//   } else if (number >= 1048576) {
//     return `${(number / 1048576).toFixed(1)} MB`;
//   }
// }

// const signupFormHandler = async e => {
          
//   e.preventDefault();

//   const firstName = document.querySelector('#signup-fname').value.trim();
//   const lastName = document.querySelector('#signup-lname').value.trim();
//   const email = document.querySelector('#signup-email').value.trim();
//   const password = document.querySelector('#signup-password').value.trim();
//   const fdish = document.querySelector('#signup-favdish').value.trim();
//   const allergies = document.querySelectorAll('.signup-allergies:checked'); 
//   let allergy, avatar;

//   if (profileImg.file || profileImg.files) {
//     avatar = profileImg.files[0].name;
//   } else {
//     avatar = null;
//   }

//   if (allergies) {
//     let allergiesList = [];

//     for (let i=0; i < allergies.length; i++) {
//         allergiesList.push(allergies[i].value); 
//     }    

//     allergy = allergiesList.toString();
//   } else {
//     allergy = null;
//   }

//   if (firstName && lastName && email && password) {
//     const result = await fetch('/api/user/signup', {
//       method: 'POST',
//       body: JSON.stringify({ firstName, lastName, email, password, allergy, fdish, avatar }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (result.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to sign up.');
//     }
//   }
// };
// if(document.querySelector('.signup-form')){
// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// };

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
  const allergies = formData.getAll('allergy');  
  formData.set('allergy', allergies.toString());

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


signupForm.addEventListener('submit', signupFormHandler, false);

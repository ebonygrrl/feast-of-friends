const dishFormHandler = async (event) => {
    event.preventDefault();
  
    const dishname = document.querySelector('#famous-dish').value.trim();
    const dishtype = document.querySelector('#dish-type').value.trim();
    const dishallergy = document.querySelector('#dish-allergies').value.trim();
  
    if (dishname && dishtype && dishallergy) {
      const response = await fetch('/api/dish', {
        method: 'POST',
        body: JSON.stringify({ dishname, dishtype, dishallergy }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((data) => data.json()).then((info) => {
        
        console.log('SHOWING INFO CONSOLE',info);
        document.location.replace(`/event/${info.id}`);
      })
      .catch((err) => alert('Failed to create potluck dish', err));
    }
};

const createBtn = document.getElementById("dish-form");
createBtn.addEventListener("click", dishFormHandler);
  
//       if (response.ok) {
//         document.location.replace('/api/');
//       } else {
//         alert('Failed to add dish.');
//       }
//     }
//   };
  
//   document
//     .querySelector('.dish-form')
//     .addEventListener('submit', dishFormHandler);

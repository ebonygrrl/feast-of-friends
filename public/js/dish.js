// const dishFormHandler = async (event) => {
//     event.preventDefault();
  
//     const dishname = document.querySelector('#famous-dish').value.trim();
//     const dishtype = document.querySelector('#dish-type').value.trim();
//     const dishallergy = document.querySelector('#dish-allergies').value.trim();
  
//     if (dishname && dishtype && dishallergy) {
//       const response = await fetch('/api/dish', {
//         method: 'POST',
//         body: JSON.stringify({ dishname, dishtype, dishallergy }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to add dish.');
//       }
//     }
//   };
  
//   document
//     .querySelector('.dish-form')
//     .addEventListener('submit', dishFormHandler);

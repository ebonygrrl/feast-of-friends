//gets data the user puts in the dish-form.handlebars form to create an event
//the event created should be a dish being added 
const dishFormHandler = async (event) => {
    event.preventDefault();
  
    const dishname = document.querySelector('#famous-dish').value.trim();
    const dishtype = document.querySelector('#dish-type').value.trim();
    const dishallergy = document.querySelector('#dish-allergies').value.trim();
    const eventID = document.querySelector('#event-id').innerHTML;
  
    if (dishname && dishtype && dishallergy) {
      const response = fetch('/api/dish', {
        method: 'POST',
        body: JSON.stringify({ dishname, dishtype, dishallergy, eventID }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((data) => data.json()).then((info) => {
        
        console.log('SHOWING INFO CONSOLE',info);
        document.location.replace(`/event/${eventID}`);
      })
      .catch((err) => alert('Failed to create potluck dish', err));
    };
};
if(document.querySelector("#dishform")){
  document.querySelector("#dishform").addEventListener('click', dishFormHandler);
};
// const createBtn = document.getElementById("dish-form");
// createBtn.addEventListener("click", dishFormHandler);

  


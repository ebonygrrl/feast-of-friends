
//create potluck 
const createPotluckFormHandler = async (event) => {
    event.preventDefault();

    //navigate to create Potluck Page
    document.location.replace('/create');
  };
  
  const signupBtn=document.getElementById("createPotluck");
  signupBtn.addEventListener("click", createPotluckFormHandler);

  //join potluck
  const joinPotluckFormHandler = async (event) => {
    event.preventDefault();

    //get code data from document
    const eventCode=document.getElementById("event-code").ariaValueMax.trim();
    
    if (eventCode){
      const response=await fetch('/api/combo',{
        method: 'POST',
        body: JSON.stringify({eventCode}),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //view event
        document.location.replace(`/api/event/${eventCode}`);
      } else {
        alert('Failed to create event.');
      }


    }

   
  };
  
  const joinBtn=document.getElementById("joinPotluck");
  signupBtn.addEventListener("click", joinPotluckFormHandler);
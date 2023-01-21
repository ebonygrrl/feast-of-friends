
//create potluck 
const createPotluckFormHandler = async (event) => {
    event.preventDefault();

    //CHECK
    console.log('line 7 in dashboard.js');
    //navigate to create Potluck Page
    document.location.replace('/create');
  };
  
  const signupBtn=document.getElementById("createPotluck");
  signupBtn.addEventListener("click", createPotluckFormHandler);



  //join potluck
  const joinPotluckFormHandler = async (event) => {
    event.preventDefault();

    //CHECK
    console.log('line 22 in dashboard.js'); 
    //get code data from document
    const eventCode=document.getElementById("event-code").value.trim();
    console.log('line 25 at dashboard.js ', eventCode );
    
    if (eventCode){
      const response=await fetch('/api/combo',{
        method: 'POST',
        body: JSON.stringify({eventCode}),
        headers: { 'Content-Type': 'application/json' },
      }).then((data)=>{
        console.log('line 34 dashboard.js response: ', data.json());
        if (data.ok){
          document.location.replace(`/event/${eventCode}`);
        }
        else{
          alert("You already RSVPed to this potluck.", data);
        };
      });

 
    }
  };
  
const joinBtn=document.querySelector(".join-event");
joinBtn.addEventListener("submit", joinPotluckFormHandler);
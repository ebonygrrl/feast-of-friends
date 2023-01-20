//SAVE

const saveEditHandler = async (event) => {
    event.preventDefault();
    const theme = document.querySelector('#theme').value.trim();
    const when = document.querySelector('#event-Date').value;
    const where = document.querySelector('#location').value.trim();
    //get id from the url
    const eventID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
         console.log('line 13 edit-delete-event.js : ',theme, when, where, eventID);

    if (theme && when && where && eventID) {

        const editURL='/api/event';
        const newEvent = await fetch(editURL, {
            method: 'PUT',
            body: JSON.stringify({ theme, when, where, eventID }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> response.json())
        .then(data=> {
            console.log('event changed');
            //redirect to event page
            document.location.replace(`/event/${eventID}`);
            
        }).catch((err)=>{
            console.error(err);
        });
    };
}; //closes republish function

// //save button
const saveBtn=document.getElementById('save');
saveBtn.addEventListener("click",saveEditHandler);


//GO BACK TO POTLUCK EVENT PAGE

const goBackHandler = (event) =>{
    event.preventDefault();
    //get data from the url
    const eventID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if(eventID){
        document.location.replace(`/event/${eventID}`);
    }
    else{
        document.location.replace(`/dashboard`);
    };

};
const backPotluckBtn = document.getElementById('backPotluck');
backPotluckBtn.addEventListener("click",goBackHandler);
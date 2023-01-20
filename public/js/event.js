//get eventID
const potluckID=document.querySelector('#event-id').innerHTML;

//edit potluck 
const editPotluckFormHandler = async (event) => {
    event.preventDefault();
    // console.log(potluckID);
    //CHECK
    console.log('line 9 in event.js');
    //navigate to create Potluck Page
    document.location.replace(`/edit/${potluckID}`);
};
  
const signupBtn=document.getElementById("editEvent");
signupBtn.addEventListener("click", editPotluckFormHandler);

//go back to dashboard
const toDashboardFormHandler = (event) => {
    event.preventDefault();
    // console.log(potluckID);
    //CHECK
    console.log('line 22 in event.js');
    //navigate to create Potluck Page
    document.location.replace(`/dashboard`);
};
  
const toDashBtn=document.getElementById("backDashboard");
toDashBtn.addEventListener("click", toDashboardFormHandler);

//leave Potluck Button
const leavePotluckFormHandler = async (event) => {
    event.preventDefault();

        //ask if user is sure to leave event
        let leavePrompt=confirm('Are you sure you want to leave this potluck?');

        if(potluckID && leavePrompt){
            const response = await fetch(`/api/combo/`,{
                method: 'DELETE',
                body: JSON.stringify({ potluck_ID: potluckID }),
                headers: { 'Content-Type': 'application/json' },
              }).then((data)=>data.json()).then((info)=>{
                
                console.log('line 41 event.js',info);
                //after delete navigate to dashboard
                document.location.replace(`/dashboard`);
              }).catch((err)=>alert('Failed to leave potluck.', err));
        }

};

const leaveBtn=document.getElementById('leavePotluck');
leaveBtn.addEventListener("click", leavePotluckFormHandler);




//delete potluck
const deletePotluckFormHandler = async (event) => {
    event.preventDefault();

    //ask if user is sure to delete event
    let deletePrompt=confirm('Are you sure you want to delete this potluck?');
    console.log('line 36 in event.js', deletePrompt, potluckID);

    if(potluckID && deletePrompt){
        const response = await fetch(`/api/event/`,{
          method: 'DELETE',
          body: JSON.stringify({ potluck_ID: potluckID }),
          headers: { 'Content-Type': 'application/json' },
        }).then((data)=>data.json()).then((info)=>{
          
          console.log('line 41 event.js',info);
          //after delete navigate to dashboard
          document.location.replace(`/dashboard`);
        }).catch((err)=>alert('Failed to delete potluck.', err));
    } 
    // else{
    //     //go back to potluck event
    //     // document.location.replace(`/event/${potluckID}`);

    // };
};



const delBtn= document.getElementById("delEvent");
delBtn.addEventListener("click", deletePotluckFormHandler);





//   //join potluck
//   const joinPotluckFormHandler = async (event) => {
//     event.preventDefault();

//     //CHECK
//     console.log('line 22 in dashboard.js'); 
//     //get code data from document
//     const eventCode=document.getElementById("event-code").value.trim();
//     console.log('line 25 at dashboard.js ', eventCode );
    
//     if (eventCode){
//       const response=await fetch('/api/combo',{
//         method: 'POST',
//         body: JSON.stringify({eventCode}),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok){
//         document.location.replace(`/event/${eventCode}`);
//       }
//       else{
//         alert('Failed to join potluck');
//       };
//     }
//   };
  
// const joinBtn=document.querySelector(".join-event");
// joinBtn.addEventListener("submit", joinPotluckFormHandler);
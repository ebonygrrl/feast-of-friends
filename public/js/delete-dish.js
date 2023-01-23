// DELETE
const deleteDishHandler = async (event) => {
    event.preventDefault();

    //target parent to get elements
    console.log(event);
    console.log('line 7 delete-dish.js delete dish');

    //ask if user is sure to leave event
    let deldishPrompt=confirm('Are you sure you want to remove your signed up dish?');

    if(deldishPrompt && potluckID){
        const response = await fetch(`/api/combo/${potluckID}`,{
            method: 'PUT',
            body: JSON.stringify({ potluckID }),
            headers: { 'Content-Type': 'application/json' },
            }).then((data)=>data.json()).then((info)=>{
            
            console.log('line 19 delete-dish.js',info);

            //after delete dish navigate back to event
            document.location.replace(`/event/${potluckID}`);

            }).catch((err)=>alert('Failed to remove dish.', err));
    }
};

const delDishBtn=document.querySelector("#deleteDish");
   
if(delDishBtn){
    delDishBtn.addEventListener("click", deleteDishHandler);
   
};

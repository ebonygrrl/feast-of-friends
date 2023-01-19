//SAVE

const saveEditHandler = async (event) => {
    event.preventDefault();
    const theme = document.querySelector('#theme').value.trim();
    const when = document.querySelector('#event-Date').value;
    const where = document.querySelector('#location').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    console.log('line 7 editDeleteArticle.js : ',content,title);

    if (content && title) {

        const editURL='/api/edit/'+articleID;
        const newarticle = await fetch(editURL, {
            method: 'PUT',
            body: JSON.stringify({ content, title }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> response.json())
        .then(data=> {
            console.log('article republished');
            document.location.replace('/api/dashboard');
            
        }).catch((err)=>{
            console.error(err);
        });
    };
}; //closes republish function

//save button
const saveBtn=document.getElementById(save);
saveBtn.addEventListener("click",saveEditHandler);

// const backPotluckBtn = 
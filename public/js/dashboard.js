const createPotluckFormHandler = async (event) => {
    event.preventDefault();

    //navigate to create Potluck Page
    document.location.replace('/create-event');
  };
  

  const signupBtn=document.getElementById("createPotluck");
  signupBtn.addEventListener("click", createPotluckFormHandler);
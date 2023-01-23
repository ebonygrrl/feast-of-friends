

//get parameter from page
//get eventID
// const potluckID=document.querySelector('#event-id').innerHTML;


// Read HTML Template
// var html = fs.readFileSync("foodLabel.html",{encoding: "utf8"});

// console.log(html);



//get dish data
const printFoodLabelHandler = async (event)=>{
    event.preventDefault();

    //CHECK
    console.log('line 36 in pdfgenerator.js'); 

    // let eventCode=potluckID;
    document.location.replace(`/download/${potluckID}`);


    // const response=await fetch('/download',{
    // method: 'GET',
    // body: JSON.stringify({eventCode}),
    // headers: { 'Content-Type': 'application/json' },
    //  }).then((data)=>{
    //  console.log('line 28 pdfgenerator.js data: ', data.json());
    //     if (data.ok){
    //         alert("Food label is pdf printed");
    //         return;
    //     // document.location.replace(`/event/${potluckID}`);
    //     }
    //     else{
    //     alert("You already RSVPed to this potluck.", data);
    //     };
    // });


};

const generatePDFBtn=document.getElementById("pdfPrintFood");
if(generatePDFBtn){
    generatePDFBtn.addEventListener("click",printFoodLabelHandler)
}






// // Functional Variables

let selectedCategoryID;
let selectedDifficult ="";
let allOptionSelected = false;
let fetchedData;
let questionAnswerArray =[];

// //DOM Registration


let contentArea = document.querySelector(".contentArea")
let navBar = document.querySelector(".navBar");
let selectionBox = document.querySelector(".selectionBox")
let infoParaContainer = document.querySelector(".infoParaContainer")
let infoPara = document.querySelector(".infoPara")
// let allCategoryElements=document.querySelectorAll(".categoryPara")
let applyButton = document.querySelector(".applyButtonDisabled")
let difficultButtons = document.querySelectorAll(".difficultPara")

// URL API TRIVIA CATEGORIES



// Async Function fetching Categories from Backend (Backend request data from API )
async function autoFetch(){
let url = "http://127.0.0.1:5000/categories";
const response = await fetch(url);
fetchedData = await response.json();
return fetchedData
};

// Async function appendOptions HOF using autofetch() for async await fetch of API DATA. Data used to generate Category Divs and append them to DOM with Event Listener

async function appendOptions(){
let receivedData = await autoFetch()
receivedData.trivia_categories.forEach(element => {
let categoryBox = document.createElement("div")
categoryBox.classList.add("categoryBox")
categoryBox.addEventListener("touchstart",handleTouchCategory)
let categoryPara = document.createElement("p")
categoryPara.classList.add("categoryPara")
categoryPara.innerText = element.name
categoryBox.append(categoryPara)
selectionBox.appendChild(categoryBox)
});
   
  
  }

appendOptions();






//Added Event handler

navBar.addEventListener("touchstart", handleTouchNav);
applyButton.addEventListener("touchstart",handleApplyButton )
difficultButtons.forEach(element => {
element.addEventListener("touchstart", handleDifficultButton)
});
// //Event Functions

function handleTouchNav(event){
  console.log("touch")
  navBar.classList.toggle("navBarActive");
  navBar.removeEventListener("touchstart", handleTouchNav);
};

function handleTouchCategory(event){
  fetchedData.trivia_categories.forEach(element => {
    if(event.target.innerText == element.name)
    selectedCategoryID = element.id;
});
  checkSelection();
  //allCategoryElements erst in der Funktion initialisiert, da via Async Await fetched und generiert
  let allCategoryElements=document.querySelectorAll(".categoryPara")
  
  allCategoryElements.forEach(element => {
    
    // Überprüfen, ob das Element die Klasse 'categoryParaSelected' hat
    if (element.classList.contains("categoryParaSelected")&& element !== event.target) {
      
      element.classList.remove("categoryParaSelected");
    }
  });

  event.target.classList.add("categoryParaSelected")
};

function handleTouchAnswer(event){
  questionAnswerArray.forEach(element => {
    if(element.correct_answer == event.target.innerHTML){
      event.target.classList.add("answerParaRight")
    }else{
     if(element.correct_answer != event.target.innerHTML ){
      event.target.classList.add("answerParaWrong")
     }
    }

  }
  )
  }

async function sendParameters(url){
  
  const response = await fetch(url)
  let triviaData = await response.json();
  return triviaData;
}



// Function for Apply Button Event 
async function handleApplyButton(event){
if(allOptionSelected == true) {
  url = `http://127.0.0.1:5000/submit?selectedCategoryID=${selectedCategoryID}&selectedDifficult=${selectedDifficult}`;
  let triviaData = await sendParameters(url);
  triviaData.results.forEach(element => {
    let singleQuestionAnswer = {
      question:element.question,
      correct_answer:element.correct_answer,
      incorrect_answers:element.incorrect_answers
    };
    questionAnswerArray.push(singleQuestionAnswer)
    
    let contentBox = document.createElement("div")
    contentBox.classList.add("contentBox")
    contentArea.appendChild(contentBox)
    let questionPara = document.createElement("p")
    questionPara.classList.add("questionPara")
    questionPara.innerHTML = element.question;
    contentBox.appendChild(questionPara)
    navBar.classList.remove("navBarActive");
    let mixedAnswers = []
    element.incorrect_answers.forEach(element => {
      mixedAnswers.push(element)
    });
    mixedAnswers.push(element.correct_answer)
    mixedAnswers=shuffleArray(mixedAnswers)
    mixedAnswers.forEach(element => {
    let answerPara = document.createElement("p")
    answerPara.classList.add("answerPara")
    answerPara.addEventListener("touchstart", handleTouchAnswer)
    answerPara.innerHTML = element; 
    contentBox.appendChild(answerPara)

    });

  });
 
  return questionAnswerArray ;

}

}

function handleDifficultButton(event) {
  // Lower case necessary for Get rquest requirment(only lowerCase parameters)
  selectedDifficult = event.target.innerText.toLowerCase();
  checkSelection();
  console.log(selectedDifficult);

  difficultButtons.forEach(element => {
    if (element.classList.contains("categoryParaSelected")) {
      element.classList.remove("categoryParaSelected");
    }
  });

  event.target.classList.add("categoryParaSelected");
}
  










//Function 


function checkSelection(){
if(selectedCategoryID!=="" && selectedDifficult!==""){
  allOptionSelected = true;
  applyButton.classList.add("applyButtonEnabled")
  console.log(selectedCategoryID,selectedDifficult)
}
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
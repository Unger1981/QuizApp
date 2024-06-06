


// // Functional Variables

let selectedCategoryID;
let selectedDifficult ="";
let allOptionSelected = false;
let fetchedData;

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
console.log(fetchedData)
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
console.log(element)
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
    let contentBox = document.createElement("div")
    contentBox.classList.add("contentBox")
    contentArea.appendChild(contentBox)
    
  });
 
  return triviaData;

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